import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { db } from "../db";
import { issues, comments } from "../db/schema";
import { eq } from "drizzle-orm";

const router = express.Router();


const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

router.post("/:issueId", async (req, res) => {
  try {
    const issueId = Number(req.params.issueId);

const issue = await db
  .select()
  .from(issues)
  .where(eq(issues.id, issueId));

if (!issue[0]) {
  return res.status(404).json({
    error: "Issue not found",
  });
}

    const issueComments = await db
      .select()
      .from(comments)
      .where(eq(comments.issueId, issueId));

    const prompt = `
      Analyze this software issue.

      Title:
      ${issue[0].title}

      Description:
      ${issue[0].description}

      Comments:
      ${issueComments
        .map((comment) => comment.message)
        .join("\n")}

      Provide:
      1. Summary
      2. Severity
      3. Recommendation
    `;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.json({
      analysis: response,
    });
  } catch (error) {
    console.log(error);

res.status(500).json({
  error:
    "Gemini API quota exceeded. Please try again later.",
});
  }
});

export default router;