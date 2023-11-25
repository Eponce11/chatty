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
    getChatMessages: builder.mutation<any, any>({
      query: (data: any) => ({
        url: `/message/getChatMessages`,
        method: "POST",
        body: { ...data }
      }),
    }),
  }),
});

export const { useCreateMessageMutation, useGetChatMessagesMutation } = messageApiSlice;
