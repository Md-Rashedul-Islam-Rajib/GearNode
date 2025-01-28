import { useParams } from "react-router";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";

const Checkout = () => {
  const { id } = useParams();
  const { data } = useGetAllProductsQuery(undefined);
  const product = data?.data?.find((item) => item._id === id);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <div>
          <img
            src={
              product?.image instanceof File
                ? URL.createObjectURL(product.image)
                : product?.image ?? undefined
            }
            alt={product?.name}
            className="w-full rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">{product?.name}</h2>
          <p className="text-lg text-gray-600 mt-2">Brand: {product?.brand}</p>
          <p className="text-xl font-bold text-green-600 mt-2">
            Price: {product?.price} BDT
          </p>
          <button className="mt-4 px-6 py-3 bg-blue-500 text-white rounded">
            Proceed to Payment
          </button>
        </div>
      </div>
      {/* Implement payment or purchase logic */}
    </div>
  );
};

export default Checkout;
