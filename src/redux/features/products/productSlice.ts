import {  TProduct } from "@/types/form.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TProduct[] = [];

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

        createProduct: (state, action) => {
            const { productInfo } = action.payload;
            state.push(productInfo);
        }

    }

})

export const {createProduct } = productSlice.actions;


export default productSlice.reducer;