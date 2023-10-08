import { Application } from "express";
import { logoutUser, testFunc } from "../controllers/user.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";

const userRoutes = (app: Application) => {
  app.get("/api/user/logout", logoutUser);
  app.get("/api/user/test", verifyJWT, testFunc);
};

export default userRoutes;
