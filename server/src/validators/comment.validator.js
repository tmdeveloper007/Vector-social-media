import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const commentSchema = z.object({
  post: z.string({ required_error: "Post ID is required!" })
    .regex(objectIdRegex, { message: "Invalid Post ID format!" }),
  content: z.string({ required_error: "Comment content is required!" })
    .trim()
    .min(1, { message: "Comment content cannot be empty!" })
    .max(500, { message: "Comment content must be at most 500 characters!" }),
});
