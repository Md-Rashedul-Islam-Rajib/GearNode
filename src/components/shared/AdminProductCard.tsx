import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagicCard } from "../ui/magic-card";
import { TProduct } from "@/types/form.types";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import { ShimmerButton } from "../ui/shimmer-button";
import { useState } from "react";
import { useDeleteProductMutation } from "@/redux/features/products/productApi";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"; // Importing Dialog components
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminProductCard: React.FC<{ item: TProduct }> = ({ item }) => {
  const imageSrc =
    item?.image instanceof File ? URL.createObjectURL(item.image) : item?.image;

  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Manage dialog state

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProduct(item._id).unwrap();
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setIsDeleting(false);
      setIsDialogOpen(false); // Close dialog after deletion
    }
  };

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

        {/* Edit Button */}
        <Link to={`/admin/all-products/${item?._id}`}>
          <ShimmerButton
            className="shadow-2xl mx-auto mb-2"
            background="#34373e"
            shimmerSize="0.3em"
          >
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Edit Details
            </span>
          </ShimmerButton>
        </Link>

        {/* Delete Button with Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button
              className={`px-4 py-2 w-full text-sm font-medium rounded-lg ${
                isDeleting || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
              disabled={isDeleting || isLoading}
            >
              {isDeleting || isLoading ? "Deleting..." : "Delete Product"}
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete <strong>"{item?.name}"</strong>?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isDeleting || isLoading}
              >
                Cancel
              </Button>

              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting || isLoading}
              >
                {isDeleting || isLoading ? "Deleting..." : "Confirm Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </MagicCard>
  );
};

export default AdminProductCard;
