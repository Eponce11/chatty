import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AuthState {
  id: string | null;
  username: string | null;
  token: string | null;
  profilePicture: string | null;
}

const initialState: AuthState = {
  id: "652e06990a3086842edac9e2",
  username: 'EricP',
  token: null,
  profilePicture: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.profilePicture = action.payload.profilePicture
    },
    logout: (state: AuthState, action: PayloadAction<void>) => {
      state.id = null;
      state.username = null;
      state.token = null;
      state.profilePicture = null;
    },
    setAuthProfilePicture: (state: AuthState, action: PayloadAction<string>) => {
      state.profilePicture = action.payload
    }
  },
});

export const { setCredentials, logout, setAuthProfilePicture } = authSlice.actions;

export const selectAuthId = (state: RootState) => state.auth.id;
export const selectAuthUsername = (state: RootState) => state.auth.username;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectAuthProfilePicture = (state: RootState) => state.auth.profilePicture;

export default authSlice.reducer;
