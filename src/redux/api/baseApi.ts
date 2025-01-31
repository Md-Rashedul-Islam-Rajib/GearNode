import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000",
  baseUrl: "https://gearnode.vercel.app",

  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});
 

export const baseApi = createApi({
    tagTypes:['ORDER','ORDERS','PRODUCT','PRODUCTS','UPDATE'],
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
