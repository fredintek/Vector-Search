import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: serverUrl,
  }),
  endpoints: (builder) => ({}),
});
