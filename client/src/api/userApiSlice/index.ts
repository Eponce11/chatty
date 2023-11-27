import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchUserByUsername: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `/user/search/username`,
        method: "POST",
        body: { ...data }
      }),
    }),
  }),
});


export const { useSearchUserByUsernameMutation } = userApiSlice;