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
    getServers: builder.query<any, any>({
      query: (id: string) => ({
        url: `/server/getAll/${id}`,
        method: "GET",
      }),
    }),
    getOneServer: builder.mutation<any, any>({
      query: (serverId: string) => ({
        url: "/server/getOne",
        method: "POST",
        body: { serverId: serverId },
      }),
    }),
  }),
});

export const {
  useCreateServerMutation,
  useGetServersQuery,
  useGetOneServerMutation,
} = serverApiSlice;
