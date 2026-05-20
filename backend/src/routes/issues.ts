import express from "express";
import { db } from "../db";
import { issues } from "../db/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

//get route for all issuess
router.get("/", async (req, res) => {
  try {
    const allIssues = await db.select().from(issues);

    res.json(allIssues);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch issues",
    });
  }
});


//post route for creating issues
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    const newIssue = await db
      .insert(issues)
      .values({
        title,
        description,
      })
      .returning();

    res.status(201).json(newIssue);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to create issue",
    });
  }
});


//get route for  issue detiail page
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const issue = await db
      .select()
      .from(issues)
      .where(eq(issues.id, id));

    res.json(issue[0]);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to fetch issue",
    });
  }
});



export default router;