import { z } from "zod";

export const registerformSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be 3 or more characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  image: z.any(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
export const loginformSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

export const productZodSchema = z.object({
  name: z
    .string({
      message: "Product name is required",
    })
    ,
  brand: z
    .string({
      message: "Brand is required",
    })
   ,
  model: z
    .string({
      message: "Model is required",
    }),
  price: z
    .string({
      message: "Price is required",
    }),
  category: z.enum(["Mountain", "Road", "Hybrid", "Electric", "Scooter",""], {
    message: "Category is required",
  }),
  image: z.any(),
  description: z
    .string({
      message: "Description is required",
    }),
  quantity: z
    .string({
      message: "Quantity is required",
    }),
  inStock: z.boolean({
    message: "In-stock status is required",
  }),
});

export interface TProduct {
  _id?: string;
  name: string;
  brand: string;
  category: string ; 
  model: string;
  description: string;
  price: string| number; 
  quantity: string | number; 
  image: string | File | null;
  inStock: boolean | undefined;
  isDeleted?: boolean;
}

export type RegisterFormValues = z.infer<typeof registerformSchema>;
export type LoginFormValues = z.infer<typeof loginformSchema>;
