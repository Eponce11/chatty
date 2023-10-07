import { apiSlice } from "../apiSlice";
import { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse } from "./types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterCredentials>({
      query: (credentials: RegisterCredentials) => ({
        url: "/user/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      })
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
