import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useGetAllProductsQuery, useGetSingleProductQuery } from "@/redux/features/products/productApi";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { currentUser } from "@/redux/features/auth/authSlice";
import { User } from "@/types/auth.types";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import Bike from "@/components/loaders/Bike";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleProductQuery(id);
  const product = data?.data;
  const user: User = useSelector(currentUser) ?? {} as User;

  const [quantity, setQuantity] = useState(1);
  const totalPrice = product?.price ? Number(product.price) * quantity : 0;


  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const {refetch } = useGetAllProductsQuery(undefined);

  const handleOrderNow = async () => {
    if (!product) {
      toast.error("This product is out of stock right now.");
      return;
    }

    if (quantity > Number(product.quantity)) {
      toast.error(`Only ${product.quantity} available right now.`);
      return;
    }

    const orderInfo = {
      email: user?.email,
      product: id!,
      quantity,
      totalPrice,
    };
    console.log(orderInfo);
    await createOrder(orderInfo).unwrap();
    refetch();
    toast.success("Order placed successfully!");
    navigate(`/all-products/${id}`);
  };


    if (isLoading) {
      return (
        <div className="flex justify-center items-center">
          <Bike />
        </div>
      );
    }

  return (
    <div className="container mx-auto px-4 py-8 flex justify-center">
      <Card className="max-w-4xl w-full p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>
        <div className="flex flex-wrap md:flex-nowrap gap-6">
          <div className="flex-1 flex justify-center">
            <img
              src={
                product?.image instanceof File
                  ? URL.createObjectURL(product.image)
                  : product?.image ?? undefined
              }
              alt={product?.name}
              className="w-80 rounded-lg shadow-md"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold">{product?.name}</h2>
            <p className="text-lg text-gray-600 mt-2">
              Brand: {product?.brand}
            </p>
            <p className="text-xl font-bold text-green-600 mt-2">
              Total: {totalPrice.toLocaleString()} BDT
            </p>

            <div className="mt-6 flex items-center gap-4">
              <Button
                variant="outline"
                className="text-xl px-4 py-2"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </Button>
              <span className="text-lg font-medium">{quantity}</span>
              <Button
                variant="outline"
                className="text-xl px-4 py-2"
                onClick={() =>
                  setQuantity((prev) =>
                    Math.min(Number(product?.quantity) || 1, prev + 1)
                  )
                }
              >
                +
              </Button>
            </div>

            <Button
              onClick={handleOrderNow}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-lg py-3 rounded-lg"
            >
              Order Now
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Checkout;
