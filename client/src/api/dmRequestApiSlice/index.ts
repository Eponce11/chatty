import { apiSlice } from "../apiSlice";
import { NewDmRequestData, NewDmRequestResponse } from "./types";

export const dmRequestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createDmRequest: builder.mutation<NewDmRequestResponse, NewDmRequestData>({
      query: (data: NewDmRequestData) => ({
        url: "/dmRequest/create",
        method: "POST",
        body: { ...data },
      }),
    }),
    getDmRequests: builder.query<any, any>({
      query: (id: string) => ({
        url: `/dmRequest/getRequests/${id}`,
        method: "GET",
      }),
    }),
    getDmPending: builder.query<any, any>({
      query: (id: string) => ({
        url: `/dmRequest/getPending/${id}`,
        method: "GET",
      }),
    }),
    acceptDmRequest: builder.mutation<any, any>({
      query: (data: any) => ({
        url: "/dmRequest/accept",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const {
  useCreateDmRequestMutation,
  useGetDmRequestsQuery,
  useGetDmPendingQuery,
  useAcceptDmRequestMutation,
} = dmRequestApiSlice;
