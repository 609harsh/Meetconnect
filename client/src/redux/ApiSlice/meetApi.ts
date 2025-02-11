import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Address,
  ApiResponse,
  ApiSkillResponse,
  ApiUserResponse,
  Education,
  Experience,
  Interview,
  Skill,
  User,
} from "../../types";
const api_url: string = import.meta.env.VITE_API_HOST;

export const meetApi = createApi({
  reducerPath: "meetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: api_url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token") as string;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
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
      transformResponse: (response: ApiUserResponse) => {
        return response?.data;
      },
      transformErrorResponse: (response) => {
        return response?.data;
      },
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
      transformResponse: (response: ApiUserResponse) => {
        return response?.data;
      },
      transformErrorResponse: (response) => {
        return response?.data;
      },
    }),
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

    patchEducationProfile: builder.mutation<
      ApiResponse<Education>,
      { body: object }
    >({
      query: ({ body }) => ({
        url: `education`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
    deleteEducation: builder.mutation<ApiResponse<Education>, { id: string }>({
      query: ({ id }) => ({
        url: `education/${id}`,
        method: "DELETE",
      }),
    }),
    patchAddressProfile: builder.mutation<
      ApiResponse<Address>,
      { body: Address }
    >({
      query: ({ body }) => {
        return {
          url: `address`,
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ ...body }),
        };
      },
    }),
    updateSkills: builder.mutation<ApiSkillResponse, { body: Skill[] }>({
      query: ({ body }) => {
        return {
          url: `skills`,
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        };
      },
    }),
    updateWorkExperience: builder.mutation<
      ApiResponse<Experience>,
      { newExperience: Experience }
    >({
      query: ({ newExperience }) => ({
        url: `workexperience`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newExperience),
      }),
    }),
    deleteWorkExperience: builder.mutation<
      ApiResponse<Experience>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `workexperience/${id}`,
        method: "DELETE",
      }),
    }),
    updateProfile: builder.mutation<ApiResponse<User>, { body: User }>({
      query: ({ body }) => ({
        url: `profile`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      }),
    }),
    updateProfileImage: builder.mutation<ApiResponse<User>, { url: string }>({
      query: ({ url }) => ({
        url: `image?url=${url}`,
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({}),
      }),
    }),
  }),
});

export const {
  useGetInterviewsQuery,
  useDeleteInterviewsMutation,
  useCreateInterviewsMutation,
  useUserLoginMutation,
  useUserSignupMutation,
  usePatchEducationProfileMutation,
  usePatchAddressProfileMutation,
  useUpdateSkillsMutation,
  useUpdateWorkExperienceMutation,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
  useDeleteEducationMutation,
  useDeleteWorkExperienceMutation,
} = meetApi;
