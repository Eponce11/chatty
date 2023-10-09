import { Application } from "express";
import {
  login,
  register,
  handleRefreshToken,
  logout,
} from "../controllers/auth.controller";

const authRoutes = (app: Application) => {
  app.post("/api/auth/login", login);
  app.post("/api/auth/register", register);
  app.get("/api/auth/refreshToken", handleRefreshToken);
  app.get("/api/auth/logout", logout);
};

export default authRoutes;
