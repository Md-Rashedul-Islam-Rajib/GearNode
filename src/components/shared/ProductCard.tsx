import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "../ui/magic-card";
import { TProduct } from "@/types/form.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { ShimmerButton } from "../ui/shimmer-button";

const ProductCard: React.FC<{ item: TProduct }> = ({ item }) => {
  const imageSrc =
    item?.image instanceof File ? URL.createObjectURL(item.image) : item?.image;

  return (
    <MagicCard
      className="flex flex-col items-center text-center p-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105 relative bg-white border border-gray-200"
      gradientOpacity={0.2}
      gradientSize={300}
    >
      {/* Product Image */}
      <CardContent className="p-4">
        {item?.image ? (
          <figure className="relative bg-transparent">
            <img
              src={imageSrc!}
              alt={item.name}
              className="w-full mix-blend-multiply h-48 object-cover rounded-lg mb-4"
            />
          </figure>
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </CardContent>

      {/* Badge for Category */}
      {item?.category && (
        <Badge className="bg-blue-100 text-blue-600 px-3 py-1 text-xs mb-3">
          {item.category}
        </Badge>
      )}

      {/* Card Header */}
      <CardHeader className="p-4 border-t border-gray-200">
        <CardTitle className="text-lg font-semibold truncate">
          {item?.name || "Unnamed Product"}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 mt-1">
          {item?.brand ? `Brand: ${item.brand}` : "No brand available"}
          {item?.model && ` | Model: ${item.model}`}
        </CardDescription>
      </CardHeader>

      {/* Stock Status */}
      <CardContent className="p-4">
        <div className="mb-2">
          {item?.inStock ? (
            <Badge className="bg-green-100 text-green-600 px-3 py-1 text-xs">
              In Stock
            </Badge>
          ) : (
            <Badge className="bg-red-100 text-red-600 px-3 py-1 text-xs">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Price */}
        <p className="text-lg font-bold text-gray-800 mb-2">
          {item?.price ? `${item.price} BDT` : "Price Not Available"}
        </p>

        {/* Add to Cart Button */}

        <Link to={`/all-products/${item?._id}`}>
          <ShimmerButton className="shadow-2xl mx-auto" background="#34373e" shimmerSize="0.3em">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              View Details
            </span>
          </ShimmerButton>
        </Link>

        {/* <button
          className={`px-4 py-2 w-full text-sm font-medium rounded-lg ${
            item?.inStock
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!item?.inStock}
        >
          {item?.inStock ? "Add to Cart" : "Out of Stock"}
        </button> */}
      </CardContent>
    </MagicCard>
  );
};

export default ProductCard;
