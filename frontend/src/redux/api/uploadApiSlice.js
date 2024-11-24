import { apiSlice } from ".";

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // endpoint to upload a CV
    uploadCV: builder.mutation({
      query: (body) => ({ url: "/cv/upload", body, method: "POST" }),
    }),
  }),
});

export const { useUploadCVMutation } = uploadApiSlice;
