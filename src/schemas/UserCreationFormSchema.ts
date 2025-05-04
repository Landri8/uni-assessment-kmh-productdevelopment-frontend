import {z} from 'zod'

export const UserCreationFormSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(50, "Name must be at most 50 characters"),
    email: z.string().email("Please enter a valid email address"),
    role: z.enum(["1", "2"], {
      errorMap: () => ({ message: "Please select a valid role" }),
    }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export type UserCreationFormData = z.infer<typeof UserCreationFormSchema>;