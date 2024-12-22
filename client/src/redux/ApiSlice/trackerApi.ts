import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Column, Job } from "../../types";
const api_url: string = import.meta.env.VITE_API_HOST + "tracker/";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export interface NewApiResponse<T> {
  success: boolean;
  data: T;
}

export const trackerApi = createApi({
  reducerPath: "trackerApi",
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
    getTrackerDetails: builder.query<NewApiResponse<Column[]>, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    createTrackerColumn: builder.mutation<
      ApiResponse<Column>,
      { idx: number; columnTitle: string }
    >({
      query: ({ idx, columnTitle }) => ({
        url: `column`,
        method: "POST",
        body: JSON.stringify({ idx, columnTitle }),
        headers: {
          "content-type": "application/json",
        },
      }),
      transformResponse: (response: any) => {
        return response;
      },
    }),

    patchTrackerColumn: builder.mutation<
      ApiResponse<Column>,
      { columnId: string; title: string }
    >({
      query: ({ columnId, title }) => ({
        url: `column/${columnId}`,
        method: "PATCH",
        body: JSON.stringify({ title }),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    deleteTrackerColumn: builder.mutation<
      ApiResponse<Column>,
      { columnId: string }
    >({
      query: ({ columnId }) => ({
        url: `column/${columnId}`,
        method: "DELETE",
      }),
    }),
    createNewJob: builder.mutation<ApiResponse<Job>, { body: Job }>({
      query: ({ body }) => ({
        url: `job/${body.columnId}`,
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    deleteJob: builder.mutation<
      ApiResponse<Job>,
      { columnId: string; jobId: string }
    >({
      query: ({ columnId, jobId }) => ({
        url: `job/${columnId}/${jobId}`,
        method: "DELETE",
      }),
    }),
    swapColumn: builder.mutation<
      ApiResponse<any>,
      { columnId1: string; columnId2: string; newIdx1: number; newIdx2: number }
    >({
      query: ({ columnId1, columnId2, newIdx1, newIdx2 }) => ({
        url: "swapcolumn",
        method: "PATCH",
        body: JSON.stringify({ columnId1, columnId2, newIdx1, newIdx2 }),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    swapSameColumn: builder.mutation<
      ApiResponse<any>,
      {
        columnId: string;
        jobId1: string;
        jobId2: string;
      }
    >({
      query: ({ columnId, jobId1, jobId2 }) => ({
        url: `swapSamecolumn/${columnId}`,
        method: "PATCH",
        body: JSON.stringify({ columnId, jobId1, jobId2 }),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
    swapDifferentColumn: builder.mutation<
      ApiResponse<any>,
      { jobId: string; columnId1: string; columnId2: string }
    >({
      query: ({ jobId, columnId1, columnId2 }) => ({
        url: `swapDifferentcolumn/${jobId}`,
        method: "PATCH",
        body: JSON.stringify({ columnId1, columnId2 }),
        headers: {
          "content-type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetTrackerDetailsQuery,
  useCreateTrackerColumnMutation,
  usePatchTrackerColumnMutation,
  useDeleteTrackerColumnMutation,
  useCreateNewJobMutation,
  useDeleteJobMutation,
  useSwapColumnMutation,
  useSwapSameColumnMutation,
  useSwapDifferentColumnMutation,
} = trackerApi;
