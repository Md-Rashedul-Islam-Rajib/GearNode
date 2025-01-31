import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { uploadImage } from "@/utilities/imageUploader";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import {
  useGetAllUsersQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";

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
import Gear from "@/components/loaders/Gear";
import { useNavigate } from "react-router";
import { User } from "@/types/auth.types";

// Define Zod validation schema
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  image: z.any().nullable(), // Image can be null initially
});

type TProfile = z.infer<typeof profileSchema>;

const UpdateProfile = () => {
  const { data } = useGetAllUsersQuery(undefined);
  const navigate = useNavigate();
  const user = useAppSelector(currentUser);

  const profile = data?.data.find((item : User) => user?.email === item.email);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const form = useForm<TProfile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      image: profile?.image || null,
    },
  });

  const [previewImage, setPreviewImage] = useState<string | null>(
    profile?.image || null
  );

  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name,
        email: profile.email,
        image: profile.image,
      });
      setPreviewImage(profile.image || null);
    }
  }, [profile, form]);

  const onSubmit = async (data: TProfile) => {
    try {
      let imageUrl = data.image;

      if (typeof data.image !== "string" && data.image instanceof File) {
        try {
          imageUrl = await uploadImage(data.image);
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Image upload failed");
          return;
        }
      }

      const updatedData = { ...data, image: imageUrl };
      await updateProfile(updatedData).unwrap();
      toast.success("Profile updated successfully!");
      navigate(`/${user?.role}/profile`);
    } catch (error) {
      toast.error("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-0">
      <h1 className="text-3xl text-center mb-6">Update Profile</h1>
      <div className="flex justify-center h-screen">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Image Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col items-center">
                      {previewImage && (
                        <img
                          src={previewImage}
                          alt="Profile"
                          className="w-24 h-24 rounded-full shadow-md mb-2"
                        />
                      )}
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            field.onChange(file);
                            setPreviewImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Name Input */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Input */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              className="my-4 flex items-center justify-center gap-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span>Updating...</span>
                  <Gear />
                </div>
              ) : (
                "Update Profile"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdateProfile;
