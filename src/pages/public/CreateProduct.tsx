import { ProductFormValues, productZodSchema } from "@/types/form.types";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import Gear from "@/components/loaders/Gear";

const CreateProduct = () => {
    const [loading, setLoading] = useState(false);
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productZodSchema),
    defaultValues: {
        name: "",
        brand: "",
        category: "",
        model: "",
        description: "",
        price: "",
        quantity: "",
        image: null,
        inStock: undefined
        
    },
  });

  const onSubmit = async (data: ProductFormValues) => {
      console.log(data)
      setLoading(true);
    try {
      let imageUrl = null;
      if (data.image) {
        console.log("Uploading image...");
        try {
          imageUrl = await uploadImage(data?.image);

          console.log("Uploaded image URL:", imageUrl);
        } catch (error: unknown) {
          console.error("Error uploading image:", error);
          return;
        }
        }
        
        const convertedPrice = Number(data.price);
        const convertedQuantity = Number(data.quantity);

      const productInfo = { ...data, image: imageUrl, price: convertedPrice,quantity: convertedQuantity };
      console.log("Product Info:", productInfo);

      // Send the form data, including the image URL, to the API
      if (!productInfo.image) {
        throw new Error("image is required");
      }
      const res = await fetch("http://localhost:5000/products/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productInfo),
      });

      if (res.ok) {
        const result = await res.json();
          console.log("User Created:", result);
          setLoading(false);
          form.reset();
      } else {
        const error = await res.json();
          console.error("Error:", error.message);
          setLoading(false);
          
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error submitting form:", error);
      } else {
        console.error("Unknown error occurred:", error);
      }
    }
  };

  return (
    <div className=" p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6"> Create Product</h1>
      <div className="flex justify-center h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name : </FormLabel>
                  <FormControl>
                    <Input autoComplete="name" placeholder="Name" {...field} />
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
                  <FormLabel>Brand : </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="brand"
                      placeholder="Brand"
                      {...field}
                    />
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
                  <FormLabel>Image : </FormLabel>
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
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model : </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="model"
                      placeholder="Model"
                      {...field}
                    />
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
                  <FormLabel>Category :</FormLabel>
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
                  <FormLabel>Price : </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="price"
                      placeholder="Price"
                      {...field}
                    />
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
                  <FormLabel>Quantity : </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      autoComplete="quantity"
                      placeholder="Quantity"
                      {...field}
                    />
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
                  <FormLabel>Description : </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="description"
                      placeholder="Description"
                      {...field}
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
                  <FormLabel>In Stock :</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      // Convert the string value ('true' or 'false') to boolean
                      field.onChange(value === "true"); // 'true' => true, 'false' => false
                    }}
                    value={field.value ? "true" : "false"} // Ensure the field is displayed as 'true' or 'false'
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stock status" />
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
            <Button
              className="my-4 flex items-center justify-center gap-2"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <span>Creating...</span>
                  <Gear />
                </div>
              ) : (
                "Create Product"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProduct;
