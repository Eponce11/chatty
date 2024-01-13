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
      query: (data: any) => {
        const bodyFormData = new FormData();
        bodyFormData.append('image', data.image);
        bodyFormData.append('_id', data.id)
        return {
          url: `/user/new/profile-picture`,
          method: 'POST',
          body: bodyFormData,
          formData: true
        }
      }
    })
  }),
});


export const { useSearchUserByUsernameMutation, useSetProfilePictureMutation } = userApiSlice;
