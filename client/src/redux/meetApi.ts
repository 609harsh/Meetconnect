import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Interview, Resources } from "../types";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiUserResponse {
  success: boolean;
  data: string;
}

export const meetApi = createApi({
  reducerPath: "meetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
  }),
  endpoints: (builder) => ({
    getInterviews: builder.query<Interview[], void>({
      query: () => ({
        url: `interviews`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Interview[]>) => response?.data,
    }),
    deleteInterviews: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `interviews/${id}`,
        method: "DELETE",
      }),
      transformResponse: (response: ApiResponse<Interview>) =>
        response?.success,
    }),
    createInterviews: builder.mutation<ApiResponse<Interview>, Interview>({
      query: (body) => ({
        url: `schedule`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
    fetchResources: builder.query<Resources[], void>({
      query: () => ({
        url: `resources`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Resources[]>) => response?.data,
    }),
    userLogin: builder.mutation<string, { email: string; password: string }>({
      query: (body) => ({
        url: `login`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }),
      transformResponse: (response: ApiUserResponse) => response?.data,
    }),
    userSignup: builder.mutation<
      string,
      { name: string; email: string; password: string; phoneNumber: string }
    >({
      query: (body) => ({
        url: `signup`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }),
      transformResponse: (response: ApiUserResponse) => response?.data,
    }),
  }),
});

export const {
  useGetInterviewsQuery,
  useDeleteInterviewsMutation,
  useCreateInterviewsMutation,
  useFetchResourcesQuery,
  useUserLoginMutation,
  useUserSignupMutation,
} = meetApi;
