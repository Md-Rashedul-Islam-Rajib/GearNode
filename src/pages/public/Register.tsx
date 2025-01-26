import {  registerformSchema, RegisterFormValues } from "@/types/form.types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/utilities/imageUploader";


const Register = () => {

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerformSchema),
        defaultValues: {
            name: "",
            email: "",
            image: null,
            password: ""
        }
    });

    

    const onSubmit = async (data: RegisterFormValues) => {
        // console.log(data)
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

          // Send the form data, including the image URL, to the API
            if (!userInfo.image) {
                throw new Error("image is required");
            }
            const res = await fetch("http://localhost:5000/auth/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userInfo),
            });

          if (res.ok) {
            const result = await res.json();
            console.log("User Created:", result);
        
          } else {
            const error = await res.json();
            console.error("Error:", error.message);
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error submitting form:", error);
          } else {
            console.error("Unknown error occurred:", error);
          }
        }
    }

  return (
    <div className=" p-4 md:p-0">
        
      <h1 className="text-3xl text-center mb-6"> Register</h1>
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

            <Button className="my-4" type="submit">Register</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Register
