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
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/products",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TProduct[]>) => {
        return {
          data: response?.data,
        //   meta: response?.meta,
        };
      },
    }),
  }),
});

export const { useCreateProductMutation, useGetAllProductsQuery } = productApi;
