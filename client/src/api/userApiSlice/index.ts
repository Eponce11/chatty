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
    setProfilePicture: builder.mutation<any,any>({
      query: (id: string) => ({
        url: `/user/new/profile-picture`,
        method: 'POST',
        body: { _id: id }
      })
    })
  }),
});


export const { useSearchUserByUsernameMutation, useSetProfilePictureMutation } = userApiSlice;