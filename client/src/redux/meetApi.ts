import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Address, Education, Interview, Resources, Skill } from "../types";
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
    userLogin: builder.mutation<
      string,
      { email: string; password?: string; google?: boolean }
    >({
      query: ({ email, password, google = false }) => ({
        url: `login`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, password, google }),
      }),
      transformResponse: (response: ApiUserResponse) => response?.data,
    }),
    userSignup: builder.mutation<
      string,
      {
        name: string;
        email: string;
        password?: string;
        phoneNumber?: string;
        google?: boolean;
      }
    >({
      query: ({ name, email, password, phoneNumber, google = false }) => ({
        url: `signup`,
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phoneNumber,
          google,
        }),
      }),
      transformResponse: (response: ApiUserResponse) => response?.data,
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
    patchEducationProfile: builder.mutation<
      ApiResponse<Education>,
      { username: string; id?: string; body: object }
    >({
      query: ({ username, id, body }) => ({
        url: `education/${username}?id=${id}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
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
    patchAddressProfile: builder.mutation<
      ApiResponse<Address>,
      { username: String; body: Address }
    >({
      query: ({ username, body }) => {
        return {
          url: `address/${username}`,
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ ...body }),
        };
      },
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
    patchSkillsProfile: builder.mutation<
      ApiSkillResponse,
      { username: string; body: Skill[] }
    >({
      query: ({ username, body }) => {
        return {
          url: `skills/${username}`,
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        };
      },
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
  useFetchEducationMutation,
  usePatchEducationProfileMutation,
  useFetchAddressProfileMutation,
  usePatchAddressProfileMutation,
  useFetchSkillsProfileMutation,
  usePatchSkillsProfileMutation,
} = meetApi;
