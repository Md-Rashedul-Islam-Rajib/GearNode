import { loginformSchema, LoginFormValues } from "@/types/form.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useAppDispatch } from "@/redux/hooks";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { User } from "@/types/auth.types";
import { tokenDecoder } from "@/utilities/tokenDecoder";
import { toast } from "sonner";
import { signin } from "@/redux/features/auth/authSlice";
import Gear from "@/components/loaders/Gear";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginformSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login(data).unwrap();
      const user = tokenDecoder(res?.data?.token as string) as User;
      dispatch(signin({ user, token: res.data.token }));
      toast.success("Logged in successfully!", { id: toastId });
      navigate(`/${user?.role}`);
    } catch (error) {
      toast.error("Invalid email or password!", { id: toastId });
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/assets/login.jpg')] bg-cover bg-center flex justify-center items-center text-white px-6">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gray-950/70"></div>

      <div className="relative z-10 my-6 md:my-0 grid grid-cols-1 rounded-xl items-center">


        <div className="flex items-center justify-center ">
          <div className="w-full max-w-md p-8 space-y-6 bg-gray-300 dark:bg-gray-800 shadow-lg rounded-2xl">
            <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Please enter your details
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          className="dark:bg-gray-700"
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
                      <FormLabel className="text-gray-700 dark:text-gray-300">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          className="dark:bg-gray-700"
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
                      <span>Logging in...</span>
                      <Gear />
                    </>
                  ) : (
                    "Log In"
                  )}
                </Button>
              </form>
            </Form>

            <p className="text-center text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
