import { apiSlice } from "../apiSlice";
import { NewMessageData, NewMessageResponse } from "./types";

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createMessage: builder.mutation<NewMessageResponse, NewMessageData>({
      query: (data: NewMessageData) => ({
        url: "/message/create",
        method: "POST",
        body: { ...data },
      }),
    }),
    getChatMessages: builder.query<any, any>({
      query: (data: any) => ({
        url: `/message/getChatMessage/${data.chatId}/${data.userId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateMessageMutation, useGetChatMessagesQuery } = messageApiSlice;
