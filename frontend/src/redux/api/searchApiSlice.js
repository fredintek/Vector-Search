import { apiSlice } from ".";

export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // test server endpoint
    testServer: builder.query({
      query: () => "/",
    }),

    // query search endpoint
    search: builder.mutation({
      query: (body) => ({ url: "/cv/search", body, method: "POST" }),
    }),
  }),
});

export const { useTestServerQuery, useSearchMutation } = searchApiSlice;
