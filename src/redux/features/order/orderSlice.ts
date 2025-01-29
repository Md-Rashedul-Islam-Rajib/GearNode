import { TOrder } from "@/types/order.types";
import { createSlice } from "@reduxjs/toolkit";


const initialState: TOrder[] = [];

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

        createOrder: (state, action) => {
            const { orderInfo } = action.payload;
            state.push(orderInfo);
        }


    }
})

export const { createOrder } = orderSlice.actions;

export default orderSlice.reducer;