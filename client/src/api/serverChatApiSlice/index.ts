import { apiSlice } from "../apiSlice";

export const serverChatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServerChats: builder.query<any, any>({
      query: (id: string) => ({
        url: `/serverChat/getAllChats/${id}`,
        method: "GET",
      }),
    }),
    getOneServerChat: builder.mutation<any, any>({
      query: (channelId: string) => ({
        url: `/serverChat/getOne`,
        method: "POST",
        body: { channelId: channelId },
      }),
    }),
  }),
});

export const { useGetAllServerChatsQuery, useGetOneServerChatMutation } =
  serverChatApiSlice;
