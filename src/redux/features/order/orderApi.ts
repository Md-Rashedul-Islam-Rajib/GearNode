import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types/global.types";
import { TOrder, TUpdateOrder } from "@/types/order.types";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create a order
    createOrder: builder.mutation({
      query: (data: TOrder) => ({
        url: "/orders/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
    // get all orders
    getAllOrders: builder.query({
      query: () => {
        return {
          url: "/orders",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TOrder[]>) => {
        return {
          data: response?.data,
        };
      },
    }),

    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
    }),
    // update a order
    updateOrder: builder.mutation<TOrder, { id: string; data: TUpdateOrder }>({
      query: ({ id, data }) => ({
        url: `orders/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // delete a order
    deleteOrder: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
    useDeleteOrderMutation,
  useGetSingleOrderQuery
} = orderApi;
