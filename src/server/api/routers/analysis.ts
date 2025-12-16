import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { analysisJobs, analysisResults, analysisCounts } from "~/server/db/schema";
import { eq, desc } from "drizzle-orm";

import { env } from "~/env";

const ML_SERVICE_URL = env.ML_SERVICE_URL;

async function callMLService(
  endpoint: string,
  formData: FormData
): Promise<any> {
  const response = await fetch(`${ML_SERVICE_URL}${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ML Service error: ${error}`);
  }

  return response.json();
}

export const analysisRouter = createTRPCRouter({
  // Upload and analyze an image
  analyzeImage: publicProcedure
    .input(
      z.object({
        file: z.instanceof(File),
        returnCropped: z.boolean().default(true),
        generateDescriptions: z.boolean().default(true),
        userId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Create analysis job
      const [job] = await ctx.db
        .insert(analysisJobs)
        .values({
          userId: input.userId || "anonymous",
          type: "image",
          status: "processing",
          originalFileName: input.file.name,
          originalFileUrl: "", // Will be set after upload
        })
        .returning();

      try {
        // Prepare form data for ML service
        const formData = new FormData();
        formData.append("file", input.file);
        formData.append("job_id", job.id.toString());
        formData.append("return_cropped", input.returnCropped.toString());
        formData.append("generate_descriptions", input.generateDescriptions.toString());

        // Call ML service
        const mlResult = await callMLService("/analyze/image", formData);

        // Update job status
        await ctx.db
          .update(analysisJobs)
          .set({
            status: "completed",
            completedAt: new Date(),
            metadata: {
              counts: mlResult.counts,
              totalDetections: mlResult.detections.length,
            },
          })
          .where(eq(analysisJobs.id, job.id));

        // Save results
        const resultsToInsert = mlResult.detections.map((det: any) => ({
          jobId: job.id,
          objectId: det.object_id,
          objectType: det.object_type,
          confidence: det.confidence,
          boundingBox: det.bounding_box,
          croppedImageUrl: det.cropped_image_url
            ? det.cropped_image_url.startsWith("http")
              ? det.cropped_image_url
              : `${ML_SERVICE_URL}${det.cropped_image_url}`
            : null,
          description: det.description,
          attributes: det.attributes || {},
        }));

        if (resultsToInsert.length > 0) {
          await ctx.db.insert(analysisResults).values(resultsToInsert);
        }

        // Save counts
        const countsToInsert = Object.entries(mlResult.counts).map(
          ([objectType, count]) => ({
            jobId: job.id,
            objectType,
            count: count as number,
          })
        );

        if (countsToInsert.length > 0) {
          await ctx.db.insert(analysisCounts).values(countsToInsert);
        }

        return {
          jobId: job.id,
          status: "completed",
          detections: mlResult.detections,
          counts: mlResult.counts,
        };
      } catch (error) {
        // Update job status to failed
        await ctx.db
          .update(analysisJobs)
          .set({
            status: "failed",
            metadata: { error: String(error) },
          })
          .where(eq(analysisJobs.id, job.id));

        throw error;
      }
    }),

  // Upload and analyze a video
  analyzeVideo: publicProcedure
    .input(
      z.object({
        file: z.instanceof(File),
        returnCropped: z.boolean().default(true),
        generateDescriptions: z.boolean().default(true),
        frameInterval: z.number().default(30),
        userId: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Create analysis job
      const [job] = await ctx.db
        .insert(analysisJobs)
        .values({
          userId: input.userId || "anonymous",
          type: "video",
          status: "processing",
          originalFileName: input.file.name,
          originalFileUrl: "",
        })
        .returning();

      try {
        // Prepare form data for ML service
        const formData = new FormData();
        formData.append("file", input.file);
        formData.append("job_id", job.id.toString());
        formData.append("return_cropped", input.returnCropped.toString());
        formData.append("generate_descriptions", input.generateDescriptions.toString());
        formData.append("frame_interval", input.frameInterval.toString());

        // Call ML service
        const mlResult = await callMLService("/analyze/video", formData);

        // Update job status
        await ctx.db
          .update(analysisJobs)
          .set({
            status: "completed",
            completedAt: new Date(),
            metadata: {
              counts: mlResult.counts,
              totalDetections: mlResult.detections.length,
              totalFrames: mlResult.total_frames,
              processedFrames: mlResult.processed_frames,
            },
          })
          .where(eq(analysisJobs.id, job.id));

        // Save results
        const resultsToInsert = mlResult.detections.map((det: any) => ({
          jobId: job.id,
          objectId: det.object_id,
          objectType: det.object_type,
          confidence: det.confidence,
          boundingBox: det.bounding_box,
          croppedImageUrl: det.cropped_image_url
            ? det.cropped_image_url.startsWith("http")
              ? det.cropped_image_url
              : `${ML_SERVICE_URL}${det.cropped_image_url}`
            : null,
          description: det.description,
          attributes: det.attributes || {},
          frameNumber: det.frame_number || null,
        }));

        if (resultsToInsert.length > 0) {
          await ctx.db.insert(analysisResults).values(resultsToInsert);
        }

        // Save counts
        const countsToInsert = Object.entries(mlResult.counts).map(
          ([objectType, count]) => ({
            jobId: job.id,
            objectType,
            count: count as number,
          })
        );

        if (countsToInsert.length > 0) {
          await ctx.db.insert(analysisCounts).values(countsToInsert);
        }

        return {
          jobId: job.id,
          status: "completed",
          detections: mlResult.detections,
          counts: mlResult.counts,
          totalFrames: mlResult.total_frames,
          processedFrames: mlResult.processed_frames,
        };
      } catch (error) {
        // Update job status to failed
        await ctx.db
          .update(analysisJobs)
          .set({
            status: "failed",
            metadata: { error: String(error) },
          })
          .where(eq(analysisJobs.id, job.id));

        throw error;
      }
    }),

  // Get analysis job by ID
  getJob: publicProcedure
    .input(z.object({ jobId: z.number() }))
    .query(async ({ ctx, input }) => {
      const job = await ctx.db.query.analysisJobs.findFirst({
        where: eq(analysisJobs.id, input.jobId),
        with: {
          results: true,
          counts: true,
        },
      });

      return job;
    }),

  // Get all jobs for a user
  getJobs: publicProcedure
    .input(
      z.object({
        userId: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const jobs = await ctx.db.query.analysisJobs.findMany({
        where: input.userId
          ? eq(analysisJobs.userId, input.userId)
          : undefined,
        orderBy: [desc(analysisJobs.createdAt)],
        limit: input.limit,
        offset: input.offset,
      });

      return jobs;
    }),

  // Get results for a job
  getJobResults: publicProcedure
    .input(z.object({ jobId: z.number() }))
    .query(async ({ ctx, input }) => {
      const results = await ctx.db.query.analysisResults.findMany({
        where: eq(analysisResults.jobId, input.jobId),
        orderBy: [desc(analysisResults.createdAt)],
      });

      return results;
    }),

  // Get counts for a job
  getJobCounts: publicProcedure
    .input(z.object({ jobId: z.number() }))
    .query(async ({ ctx, input }) => {
      const counts = await ctx.db.query.analysisCounts.findMany({
        where: eq(analysisCounts.jobId, input.jobId),
      });

      return counts;
    }),
});

