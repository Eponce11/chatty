import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../app/features/authSlice";
import { RootState } from "../app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
  let result: any = await baseQuery(args, api, extraOptions);
  if (result?.error?.originalStatus === 403) {
    console.log("sending refresh token");
    const refreshResult: any = await baseQuery(
      "/auth/refreshToken",
      api,
      extraOptions
    );
    if (refreshResult?.data) {
      const id = api.getState().auth.id;
      const username = api.getState().auth.username;
      const profilePicture = api.getState().auth.profilePicture
      api.dispatch(
        setCredentials({
          id,
          username,
          token: refreshResult.data.accessToken,
          profilePicture
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: () => ({}),
});
