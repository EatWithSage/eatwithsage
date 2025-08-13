import { z } from "zod";

export const demoFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"), 
  email: z.string().email("Please enter a valid email address"),
});

export type DemoForm = z.infer<typeof demoFormSchema>;
