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
  }),
});

export const { useCreateDmRequestMutation } = dmRequestApiSlice
