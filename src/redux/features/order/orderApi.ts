import { baseApi } from "@/redux/api/baseApi";
import { TOrder } from "@/types/order.types";

const orderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // create a order
        createOrder: builder.mutation({
            query: (data: TOrder) => ({
                url: "/orders/create",
                method: "POST",
                body: data
            })
        }),




    })
})

export const {useCreateOrderMutation} = orderApi;