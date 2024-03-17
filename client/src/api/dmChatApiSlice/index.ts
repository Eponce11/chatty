import { apiSlice } from "../apiSlice";

export const dmChatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<any, any>({
      query: (id: string) => ({
        url: `/dmChat/get/${id}`,
        method: "GET",
      }),
      providesTags: ["DmChat"],
    }),
    getOneChat: builder.query<any, any>({
      query: (id: string) => ({
        url: `/dmChat/getOne/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetChatsQuery, useGetOneChatQuery } = dmChatApiSlice;
