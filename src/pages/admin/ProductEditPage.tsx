import { useState, useEffect } from "react";
import {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useLazyGetAllProductsQuery,
  useUpdateProductMutation,
} from "@/redux/features/products/productApi";
import { useParams, useNavigate } from "react-router";
import { TProduct, productZodSchema } from "@/types/form.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utilities/imageUploader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Gear from "@/components/loaders/Gear";
import Bike from "@/components/loaders/Bike";

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {data,isLoading}= useGetSingleProductQuery(id);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  console.log(id);
  const product = data?.data;
  console.log(product);

  const form = useForm<TProduct>({
    resolver: zodResolver(productZodSchema),
    defaultValues: {
      name: product?.name || "",
      brand: product?.brand || "",
      category: product?.category || "Scooter",
      model: product?.model || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      quantity: product?.quantity?.toString() || "",
      image: product?.image || null,
      inStock: product?.quantity as number > 0, 
    },
  });

  const onSubmit = async (data: TProduct) => {
    try {
      let imageUrl = null;
      if (data.image) {
        try {
          imageUrl = await uploadImage(data.image as File);
        } catch (error: unknown) {
          console.error("Error uploading image:", error);
          return;
        }
      }

      const convertedPrice = Number(data.price);
      const convertedQuantity = Number(data.quantity);

      const productInfo = {
        ...data,
        image: imageUrl,
        price: convertedPrice,
        quantity: convertedQuantity,
      };
      if (!productInfo.image) {
        throw new Error("Image is required");
      }
     
      
      await updateProduct({ id, updatedData: productInfo }).unwrap();
      form.reset();
      navigate("/admin/all-products");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center mb-8">Edit Product</h1>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <Bike />
          
        </div>
      ) : product ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Product Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Brand" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Model" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Scooter">Scooter</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                      <SelectItem value="Mountain">Mountain</SelectItem>
                      <SelectItem value="Road">Road</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Price" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} placeholder="Quantity" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>In Stock</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value ? "true" : "false"}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="In Stock" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-4" type="submit" disabled={isUpdating}>
              {isUpdating ? <Gear /> : "Save Changes"}
            </Button>
          </form>
        </Form>
      ) : (
        <div className="text-center text-lg text-gray-600">
          Product not found.
        </div>
      )}
    </div>
  );
};

export default ProductEditPage;
