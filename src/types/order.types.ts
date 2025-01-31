import { TProduct } from "./form.types";

export type TOrder = {
  _id?: string;
  email: string;
  product:  string | TProduct;
  quantity: number;
  status?: "pending" | "processing" | "shipped" | "delivered";
  totalPrice?: number;
  isDeleted?: boolean;
  isCancelled?: boolean;
  createdAt?: Date; 
};

export type TUpdateOrder = Partial<TOrder>