import { apiSlice } from "../apiSlice";

export const serverMessageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createServerMessage: builder.mutation<any, any>({
      query: (data: any) => ({
        url: "/serverMessage/create",
        method: "POST",
        body: { ...data },
      }),
    }),
  }),
});

export const { useCreateServerMessageMutation } = serverMessageApiSlice;
