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
    register: builder.mutation<any, any>({
      query: (data: any) => ({
        url: '/user/register',
        method: 'POST',
        body: { ...data }
      }),
      transformResponse: (responseData: { data: any }) => {
        return responseData.data
      }
    }),

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
