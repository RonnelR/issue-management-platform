import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { db } from "./db";
import issueRoutes from "./routes/issues";
import commentRoutes from "./routes/comments";
import aiRoutes from "./routes/ai";

//dot env config
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

//issue routes
app.use("/issues", issueRoutes);
//comment routes
app.use("/comments", commentRoutes);
//ai rotues
app.use("/ai", aiRoutes);

app.get("/", async (req, res) => {
  try {
    const result = await db.execute("SELECT NOW()");
    res.json({
      message: "Database connected",
      time: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Database connection failed",
    });
  }
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});