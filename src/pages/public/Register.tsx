import { registerformSchema, RegisterFormValues } from "@/types/form.types";
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
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import Gear from "@/components/loaders/Gear";
import { toast } from "sonner";
import { useEffect } from "react";

const Register = () => {
  const [register, { error,isLoading,isSuccess,isError }] = useRegisterUserMutation();
  console.log(error);
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerformSchema),
    defaultValues: {
      name: "",
      email: "",
      image: null,
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      let imageUrl = null;
      if (data.image) {
        console.log("Uploading image...");
        try {
          imageUrl = await uploadImage(data.image);
          console.log("Uploaded image URL:", imageUrl);
        } catch (error: unknown) {
          console.error("Error uploading image:", error);
          return;
        }
      }

      const userInfo = { ...data, image: imageUrl };
      console.log("User Info:", userInfo);

      if (!userInfo.image) {
        throw new Error("image is required");
      }
      await register(userInfo).unwrap();
      form.reset();
    } catch (error) {
      console.error("Error in registration:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("User registered successfully!");
    } else if (isError) {
      const errorMessage =
        (error as { data: { message: string } })?.data?.message ||
        "Something went wrong!";
      toast.error(errorMessage);
    }
  }, [error,isError,isSuccess]);

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6">Register</h1>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email : </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      placeholder="Email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password : </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="my-4 flex items-center justify-center gap-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span>Registering...</span>
                  <Gear />
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
