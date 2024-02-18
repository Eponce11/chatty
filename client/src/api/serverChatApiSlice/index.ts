import { apiSlice } from "../apiSlice";

export const serverChatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllServerChats: builder.query<any, any>({
      query: (id: string) => ({
        url: `/serverChat/getAllChats/${id}`,
        method: "GET",
      }),
    }),
    getOneServerChat: builder.query<any, any>({
      query: (id: string) => ({
        url: `/serverChat/getOne/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllServerChatsQuery, useGetOneServerChatQuery } =
  serverChatApiSlice;
