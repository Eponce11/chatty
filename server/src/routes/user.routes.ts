import { Application } from "express";
import { testFunc, searchUserByUsername } from "../controllers/user.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";

const userRoutes = (app: Application) => {
  app.get("/api/user/test", verifyJWT, testFunc);
  app.post("/api/user/search/username", searchUserByUsername)
};

export default userRoutes;
