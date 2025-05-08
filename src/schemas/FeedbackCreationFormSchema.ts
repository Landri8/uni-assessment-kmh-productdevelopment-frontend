import { z } from "zod";

export const FeedbackCreationFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    role: z.string().min(2, { message: "Role must be at least 2 characters" }),
    company: z
      .string()
      .min(2, { message: "Company must be at least 2 characters" }),
    rating: z.number().min(1, { message: "Please select a rating" }).max(5),
    feedback: z
      .string()
      .min(10, { message: "Feedback must be at least 10 characters" }),
});

export type FeedbackCreationFormData = z.infer<typeof FeedbackCreationFormSchema>;
