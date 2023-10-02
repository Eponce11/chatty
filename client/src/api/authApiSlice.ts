import { apiSlice } from "./apiSlice";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  id: string;
  username: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials: LoginCredentials) => ({
        url: "/user/login",
        method: "POST",
        body: { ...credentials },
      }),
      transformResponse: (responseData: { data: LoginResponse }) => {
        return responseData.data;
      },
    }),
  }),
});

export const { useLoginMutation } = authApiSlice;
