// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import { index, pgTableCreator } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `laminor_${name}`);

export const posts = createTable(
  "post",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [index("name_idx").on(t.name)],
);

export const analysisJobs = createTable(
  "analysis_job",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    userId: d.varchar({ length: 256 }),
    type: d.varchar({ length: 50 }).notNull(), // 'image' or 'video'
    status: d.varchar({ length: 50 }).notNull().default("pending"), // 'pending', 'processing', 'completed', 'failed'
    originalFileUrl: d.text().notNull(),
    originalFileName: d.varchar({ length: 512 }),
    metadata: d.jsonb(), // Store file metadata, dimensions, etc.
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
    completedAt: d.timestamp({ withTimezone: true }),
  }),
  (t) => [
    index("analysis_job_user_idx").on(t.userId),
    index("analysis_job_status_idx").on(t.status),
    index("analysis_job_created_idx").on(t.createdAt),
  ],
);

export const analysisResults = createTable(
  "analysis_result",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    jobId: d.integer().notNull().references(() => analysisJobs.id, { onDelete: "cascade" }),
    objectId: d.varchar({ length: 256 }).notNull(), // Unique identifier for detected object
    objectType: d.varchar({ length: 256 }), // 'product', 'person', 'vehicle', etc.
    confidence: d.real(), // Detection confidence score
    boundingBox: d.jsonb(), // {x, y, width, height}
    croppedImageUrl: d.text(), // URL to cropped image
    description: d.text(), // LLM-generated description
    attributes: d.jsonb(), // Additional attributes (color, size, etc.)
    frameNumber: d.integer(), // For video analysis
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    index("analysis_result_job_idx").on(t.jobId),
    index("analysis_result_type_idx").on(t.objectType),
    index("analysis_result_frame_idx").on(t.frameNumber),
  ],
);

export const analysisCounts = createTable(
  "analysis_count",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    jobId: d.integer().notNull().references(() => analysisJobs.id, { onDelete: "cascade" }),
    objectType: d.varchar({ length: 256 }).notNull(),
    count: d.integer().notNull().default(0),
    frameNumber: d.integer(), // For video analysis, null for images
    createdAt: d
      .timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }),
  (t) => [
    index("analysis_count_job_idx").on(t.jobId),
    index("analysis_count_type_idx").on(t.objectType),
  ],
);

// Relations
export const analysisJobsRelations = relations(analysisJobs, ({ many }) => ({
  results: many(analysisResults),
  counts: many(analysisCounts),
}));

export const analysisResultsRelations = relations(analysisResults, ({ one }) => ({
  job: one(analysisJobs, {
    fields: [analysisResults.jobId],
    references: [analysisJobs.id],
  }),
}));

export const analysisCountsRelations = relations(analysisCounts, ({ one }) => ({
  job: one(analysisJobs, {
    fields: [analysisCounts.jobId],
    references: [analysisJobs.id],
  }),
}));
