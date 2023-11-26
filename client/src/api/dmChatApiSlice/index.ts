import { apiSlice } from "../apiSlice";


export const dmChatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<any, any>({
      query: (id: string) => ({
        url: `/dmChat/get/${id}`,
        method: "GET",
      }),
    }),
    getOneChat: builder.query<any, any>({
      query: (id: string) => ({
        url: `/dmChat/getOne/${id}`,
        method: "GET"
      })
    }),
    searchForChat: builder.query<any, any>({
      query: (username: string) => ({
        url: `/dmChat/search/${username}`,
        method: "GET"
      })
    })
  }),
});

export const { useGetChatsQuery, useGetOneChatQuery } = dmChatApiSlice