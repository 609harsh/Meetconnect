import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Address,
  Education,
  Experience,
  Resources,
  Skill,
  User,
} from "../types";
const api_url: string = import.meta.env.VITE_API_HOST;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface ApiUserResponse {
  success: boolean;
  data: string;
}

export interface ApiSkillResponse {
  success: boolean;
  data: {
    skills: Skill[];
    id: string;
    username: string;
  };
}

export const meetApi = createApi({
  reducerPath: "meetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_url,
  }),
  endpoints: (builder) => ({
    fetchProfile: builder.mutation<ApiResponse<User>, { username: string }>({
      query: ({ username }) => {
        return {
          url: `profile/${username}`,
          method: "GET",
        };
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
  useFetchProfileMutation,
  useFetchResourcesQuery,
  useFetchEducationMutation,
  useFetchAddressProfileMutation,
  useFetchSkillsProfileMutation,
  useFetchWorkExperienceMutation,
} = meetApi;
