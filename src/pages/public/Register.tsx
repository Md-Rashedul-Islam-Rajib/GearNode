import { formSchema, FormValues } from "@/types/form.types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const Register = () => {

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            image: null,
            password: ""
        }
    });

    const uploadImage = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "pzk6cmri"); //preset_name
      formData.append("cloud_name", "dbe3ewhey"); //cloud_name

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbe3ewhey/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      return data.secure_url;
    };

    const onSubmit = async (data: FormValues) => {
        console.log(data)
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
    <div>
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
                  <Input autoComplete="email" placeholder="Email" {...field} />
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
                  <Input autoComplete="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
                  />
                  
                  <Button type="submit">Register</Button>
        </form>
      </Form>
    </div>
  );
}

export default Register
