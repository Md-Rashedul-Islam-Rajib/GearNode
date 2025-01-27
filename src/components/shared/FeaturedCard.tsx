import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "../ui/magic-card";
import { TProduct } from "@/types/form.types";


const FeaturedCard: React.FC<{ item: TProduct }> = ({ item }) => {
   const imageSrc =
     item?.image instanceof File
       ? URL.createObjectURL(item.image)
       : item?.image;
  return (
    <MagicCard
      className="flex-col items-center text-center p-4 rounded-2xl shadow-lg transition-transform transform hover:scale-105"
      gradientOpacity={0.3}
      gradientSize={300}
    >
      <CardHeader className="p-4 border-b border-gray-200">
        <CardTitle className="text-lg font-semibold truncate">
          {item?.name || "Unnamed Product"}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {item?.description || "No description available."}
        </CardDescription>
      </CardHeader>
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
        <p className="text-lg font-bold text-gray-800">
          {item?.price ? `${item.price} BDT` : "Price Not Available"}
        </p>
      </CardContent>
    </MagicCard>
  );
};

export default FeaturedCard;
