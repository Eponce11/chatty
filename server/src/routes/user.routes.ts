import { Application } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller";

const userRoutes = (app: Application) => {
  app.post("/api/user/register", registerUser);
  app.post("/api/user/login", loginUser);
  app.get("/api/user/logout", logoutUser);
};

export default userRoutes;
