import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "./meetApi";

const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const cloudinaryApi = createApi({
  reducerPath: "cloudinaryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.cloudinary.com/v1_1/",
  }),
  endpoints: (builder) => ({
    uploadProfile: builder.mutation<
      ApiResponse<String>,
      { formData: FormData }
    >({
      query: ({ formData }) => ({
        url: `${cloud_name}/image/upload`,
        method: "POST",
        body: formData,
      }),
      transformResponse: (response: any) => {
        console.log(response);
        return {
          success: response?.url ? true : false,
          data: response?.secure_url,
        };
      },
    }),
  }),
});

export const { useUploadProfileMutation } = cloudinaryApi;
