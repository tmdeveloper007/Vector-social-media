import { z } from "zod";

export const contactSchema = z.object({
  name: z.string({ required_error: "Name is required!" })
    .trim()
    .min(2, { message: "Name must be at least 2 characters!" })
    .max(100, { message: "Name must be at most 100 characters!" }),
  email: z.string({ required_error: "Email is required!" })
    .trim()
    .toLowerCase()
    .min(5, { message: "Email must be at least 5 characters!" })
    .max(254, { message: "Email must be at most 254 characters!" })
    .email({ message: "Invalid email format!" }),
  subject: z.string({ required_error: "Subject is required!" })
    .trim()
    .min(3, { message: "Subject must be at least 3 characters!" })
    .max(200, { message: "Subject must be at most 200 characters!" }),
  message: z.string({ required_error: "Message is required!" })
    .trim()
    .min(10, { message: "Message must be at least 10 characters!" })
    .max(5000, { message: "Message must be at most 5000 characters!" }),
});
