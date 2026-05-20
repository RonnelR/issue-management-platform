import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

//issuess schemaa
export const issues = pgTable("issues", {
  id: serial("id").primaryKey(),

  title: text("title").notNull(),

  description: text("description").notNull(),

  status: text("status").default("OPEN"),

  createdAt: timestamp("created_at").defaultNow(),
});


//comments schema

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),

  issueId: integer("issue_id").references(() => issues.id),

  authorName: text("author_name").notNull(),

  message: text("message").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});


//ai analyses schema

export const aiAnalyses = pgTable("ai_analyses", {
  id: serial("id").primaryKey(),

  issueId: integer("issue_id").references(() => issues.id),

  summary: text("summary"),

  severity: text("severity"),

  recommendation: text("recommendation"),

  createdAt: timestamp("created_at").defaultNow(),
});