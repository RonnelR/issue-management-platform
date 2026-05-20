import express from "express";
import { db } from "../db";
import { comments } from "../db/schema";
import { eq } from "drizzle-orm";   

const router = express.Router();

//get all comments of an issue
router.get("/:issueId", async (req, res) => {
  try {
    const issueId = Number(req.params.issueId);

    const issueComments = await db
      .select()
      .from(comments)
      .where(eq(comments.issueId, issueId));

    res.json(issueComments);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch comments",
    });
  }
});


//post route for posting comments on issue
router.post("/", async (req, res) => {
  try {
    const { issueId, authorName, message } = req.body;

    const newComment = await db
      .insert(comments)
      .values({
        issueId,
        authorName,
        message,
      })
      .returning();

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to create comment",
    });
  }
});

export default router;  