import Bike from "@/components/loaders/Bike";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetAllProductsQuery, useGetSingleProductQuery } from "@/redux/features/products/productApi";
import { useAppSelector } from "@/redux/hooks";
import { TProduct } from "@/types/form.types";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const ProductDetail = () => {

  
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);
  const { data: allData } = useGetAllProductsQuery(undefined);
  const otherProducts = allData?.data?.filter((item: TProduct) => item._id !== id);
  console.log(otherProducts)
  const product = data?.data
  const user = useAppSelector(currentUser);

  const navigate = useNavigate();
  const handleBuyNow = () => {
    if (!product?.inStock) {
      toast.error("This product is out of stock.");
      return;
    }
    if (user?.role !== "customer") {
      toast.warning("Admin can't create orders")
    }
    navigate(`/customer/checkout/${id}`);
  };
  const imageSrc =
    product?.image instanceof File
      ? URL.createObjectURL(product.image)
      : product?.image ?? undefined;

  
    if (isLoading) {
      return (
        <div className="flex justify-center items-center">
          <Bike />
        </div>
      );
    }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap gap-6">
        <div className="flex-1">
          <img
            src={imageSrc}
            alt={product?.name}
            className="w-full rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
          <h2 className="text-lg text-gray-600 mb-4">
            Brand: {product?.brand}
          </h2>
          <p className="text-xl font-semibold text-green-600 mb-2">
            {product?.price.toLocaleString()} BDT
          </p>
          <p
            className={`text-sm ${
              product?.inStock ? "text-green-500" : "text-red-500"
            } mb-4`}
          >
            {product?.inStock ? "In Stock" : "Out of Stock"} -{" "}
            {product?.quantity} available
          </p>
          {/* <Button className="w-full md:w-auto m-4" size="lg">
            Add to Cart
          </Button> */}
          <Button
            onClick={handleBuyNow}
            className="w-full md:w-auto bg-slate-700"
          >
            Buy Now
          </Button>
          {/* Product Details */}
          <div className="mt-8 hidden md:grid">
            <h3 className="text-2xl font-bold mb-4">Product Details</h3>
            <p className="text-gray-700 mb-4">{product?.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <div>
                <strong>Category:</strong> {product?.category}
              </div>
              <div>
                <strong>Brand:</strong> {product?.brand}
              </div>
              <div>
                <strong>Availability:</strong>{" "}
                <span
                  className={
                    product?.inStock ? "text-green-500" : "text-red-500"
                  }
                >
                  {product?.inStock ? "Available" : "Out of Stock"}
                </span>
              </div>
              <div>
                <strong>Quantity:</strong> {product?.quantity}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-8 md:hidden">
        <h3 className="text-2xl font-bold mb-4">Product Details</h3>
        <p className="text-gray-700 mb-4">{product?.description}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <div>
            <strong>Category:</strong> {product?.category}
          </div>
          <div>
            <strong>Brand:</strong> {product?.brand}
          </div>
          <div>
            <strong>Availability:</strong>{" "}
            <span
              className={product?.inStock ? "text-green-500" : "text-red-500"}
            >
              {product?.inStock ? "Available" : "Out of Stock"}
            </span>
          </div>
          <div>
            <strong>Quantity:</strong> {product?.quantity}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Related Products</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProducts?.slice(0, 3).map((item) => (
            <div
              key={item._id}
              className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Link to={`/all-products/${item._id}`}>
                <img
                  src={
                    item?.image instanceof File
                      ? URL.createObjectURL(item.image)
                      : item?.image ?? undefined
                  }
                  alt={item?.name}
                  className="w-full h-48 object-contain rounded-md mb-3"
                />
                <h4 className="text-lg font-semibold text-gray-700">
                  {item?.name}
                </h4>
                <p className="text-sm text-gray-500">
                  {item?.price.toLocaleString()} BDT
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default ProductDetail;
