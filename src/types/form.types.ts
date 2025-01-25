import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be 3 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  image: z.any(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export type FormValues = z.infer<typeof formSchema>;
