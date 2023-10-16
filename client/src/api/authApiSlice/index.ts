import { apiSlice } from "../apiSlice";
import { LoginCredentials, LoginResponse, RegisterCredentials, RegisterResponse } from "./types";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterCredentials>({
      query: (credentials: RegisterCredentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.data.errors
      },
    }),
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return baseQueryReturnValue.data.error
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
