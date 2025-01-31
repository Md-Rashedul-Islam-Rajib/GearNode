import { RegisterFormValues } from "@/types/form.types";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    registerUser: builder.mutation({
      query: (data: RegisterFormValues) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UPDATE"],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
    }),
    getAllUsers: builder.query({
      providesTags: ["UPDATE"],
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/auth/${id}`,
        method: "GET",
      }),
      providesTags: ["UPDATE"],
    }),
    blockUser: builder.mutation({
      invalidatesTags: ["UPDATE"],
      query: ({ id, isBlocked }) => ({
        url: `/auth/users/${id}`,
        method: "PUT",
        body: {isBlocked}
      }),
      
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useUpdateProfileMutation,
  useGetAllUsersQuery,
  useChangePasswordMutation,
  useGetSingleUserQuery,
  useBlockUserMutation
} = authApi;
