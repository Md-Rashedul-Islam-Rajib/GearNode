import { baseApi } from "@/redux/api/baseApi";
import { TProduct } from "@/types/form.types";

import { TQueryParam, TResponseRedux } from "@/types/global.types";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create a product
    createProduct: builder.mutation({
      query: (data: TProduct) => ({
        url: "/products/create",
        method: "POST",
        body: data,
      }),
    }),
    // get all products
    getAllProducts: builder.query({
      providesTags: ["PRODUCTS", "UPDATE"],
      query: (args) => {
        const params = new URLSearchParams();

        if (args && args.length > 0) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, String(item.value));
          });
          return {
            url: `/products?${params.toString()}`,
            method: "GET",
          };
        }

        return {
          url: "/products",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => ({
        data: response?.data,
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["UPDATE", "PRODUCTS"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["UPDATE", "PRODUCT"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UPDATE", "PRODUCT"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useLazyGetAllProductsQuery,
  useGetSingleProductQuery
} = productApi;
