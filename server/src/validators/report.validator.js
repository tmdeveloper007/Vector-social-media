import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const reportSchema = z.object({
  targetType: z.enum(["post", "comment"], {
    errorMap: (issue, ctx) => {
      return { message: "Target type must be either 'post' or 'comment'!" };
    }
  }),
  targetId: z.string({ required_error: "Target ID is required!" })
    .regex(objectIdRegex, { message: "Invalid target ID format!" }),
  reason: z.enum(["spam", "harassment", "hate_speech", "violence", "nudity", "misinformation", "other"], {
    errorMap: (issue, ctx) => {
      return { message: "Please select a valid report reason!" };
    }
  }),
  details: z.string().trim().max(1000, { message: "Details must be at most 1000 characters!" }).optional().default(""),
});
