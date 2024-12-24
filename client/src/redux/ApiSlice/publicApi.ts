import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Address,
  ApiResponse,
  ApiSkillResponse,
  Education,
  Experience,
  Resources,
  User,
} from "../../types";
const api_url: string = import.meta.env.VITE_API_HOST;

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_url,
  }),
  endpoints: (builder) => ({
    fetchProfile: builder.query<ApiResponse<User>, { username: string }>({
      query: ({ username }) => {
        return {
          url: `profile/${username}`,
          method: "GET",
        };
      },
      transformErrorResponse: (response: {
        status: number;
        data: { success: false; error: string };
      }) => {
        return response.data;
      },
    }),
    fetchResources: builder.query<Resources[], void>({
      query: () => ({
        url: `resources`,
        method: "GET",
      }),
      transformResponse: (response: ApiResponse<Resources[]>) => response?.data,
    }),
    fetchEducation: builder.mutation<
      ApiResponse<Education[]>,
      { username: string }
    >({
      query: ({ username }) => ({
        url: `education/${username}`,
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }),
      // transformResponse: (response) => {
      //   console.log(response);
      //   return response;
      // },
    }),
    fetchAddressProfile: builder.mutation<
      ApiResponse<Address>,
      { username: string }
    >({
      query: ({ username }) => ({
        url: `address/${username}`,
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    fetchSkillsProfile: builder.mutation<
      ApiSkillResponse,
      { username: string }
    >({
      query: ({ username }) => {
        return {
          url: `skills/${username}`,
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        };
      },
    }),
    fetchWorkExperience: builder.mutation<
      ApiResponse<Experience[]>,
      { username: string }
    >({
      query: ({ username }) => {
        return {
          url: `workexperience/${username}`,
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        };
      },
    }),
  }),
});

export const {
  useFetchProfileQuery,
  useFetchResourcesQuery,
  useFetchEducationMutation,
  useFetchAddressProfileMutation,
  useFetchSkillsProfileMutation,
  useFetchWorkExperienceMutation,
} = publicApi;
