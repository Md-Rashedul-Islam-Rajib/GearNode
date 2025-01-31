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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { uploadImage } from "@/utilities/imageUploader";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { useEffect } from "react";
import { toast } from "sonner";
import Gear from "@/components/loaders/Gear";
import { useNavigate } from "react-router";

const Register = () => {
  const navigate = useNavigate();
  const [register, { error, isLoading, isSuccess, isError }] =
    useRegisterUserMutation();
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
        imageUrl = await uploadImage(data.image);
      }
      const userInfo = { ...data, image: imageUrl };
      await register(userInfo).unwrap();
      form.reset();
    } catch (error) {
      console.error("Error in registration:", error);
    }
  };
  
  useEffect(() => {
    if (isSuccess) {
      toast.success("User registered successfully!");
      // Redirect to login page
      navigate('/login');
    } else if (isError) {
      const errorMessage =
        (error as { data: { message: string } })?.data?.message ||
        "Something went wrong!";
      toast.error(errorMessage);
    }
  }, [error, isError, isSuccess,navigate]);

  return (
    <div className="relative min-h-screen bg-[url('/assets/register.jpg')] bg-cover bg-center flex justify-center items-center text-white px-6">
      <div className="absolute inset-0 bg-gray-950/70"></div>
      <div className="relative z-10 my-6 md:my-0 grid grid-cols-1 rounded-xl items-center">

      
      <div className="flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Create an Account
            </CardTitle>
            <p className="text-gray-500 text-sm">Sign up to get started</p>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="name"
                          placeholder="Your Name"
                          {...field}
                        />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="email"
                          placeholder="Enter email"
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
                      <FormLabel>Profile Picture</FormLabel>
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          autoComplete="password"
                          placeholder="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Gear />
                      <span>Registering...</span>
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </form>
            </Form>
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?
              <span
                className="text-indigo-600 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                {" "}
                Log in
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};

export default Register;
