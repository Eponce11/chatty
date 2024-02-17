import { apiSlice } from "../apiSlice";

export const serverApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createServer: builder.mutation<any, any>({
      query: (data: any) => {
        const bodyFormData = new FormData();
        bodyFormData.append("image", data.image);
        bodyFormData.append("title", data.title);
        bodyFormData.append("userId", data.userId);
        return {
          url: "/server/create",
          method: "POST",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
  }),
});

export const { useCreateServerMutation } = serverApiSlice;