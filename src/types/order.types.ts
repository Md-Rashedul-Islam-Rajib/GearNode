export type TOrder = {
  email: string;
  product:  string;
  quantity: number;
  status?: "pending" | "processing" | "shipped" | "delivered";
  totalPrice?: number;
  isDeleted?: boolean;
  isCancelled?: boolean;
};