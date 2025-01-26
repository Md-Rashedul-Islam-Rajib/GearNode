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

const Login = () => {
  const dispatch = useAppDispatch();
  const [login, { error }] = useLoginMutation();
  console.log(error);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);
    const toastId = toast.loading("logging in");
    try {
      const res = await login(data).unwrap();
      const user = tokenDecoder(res?.data?.token as string) as User;
      dispatch(signin({ user, token: res.data.token }));
      toast.success("logged In", { id: toastId, duration: 2000 });
      //  navigate(`/${user?.role}/dashboard`);
    } catch (error) {
      toast.error("something went wrong", { id: toastId, duration: 2000 });
      console.log(error);
    }
  };

  return (
    <div className=" p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6"> Log In</h1>
      <div className="flex justify-center h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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

            <Button className="my-4" type="submit">
              Log In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
