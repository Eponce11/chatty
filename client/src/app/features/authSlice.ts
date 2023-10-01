import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface AuthState {
  id: string | null;
  username: string | null;
}

const initialState: AuthState = {
  id: null,
  username: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state: AuthState, action: PayloadAction<AuthState>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
    },
  },
});

export const { setAuth } = authSlice.actions;

export const authId = (state: RootState) => state.auth.id;

export default authSlice.reducer;
