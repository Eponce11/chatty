import { Application } from "express";
import { testFunc, searchUserByUsername, setNewProfilePicture } from "../controllers/user.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";
import { upload } from "../config/s3.config";

const userRoutes = (app: Application) => {
  app.get("/api/user/test", verifyJWT, testFunc);
  app.post("/api/user/search/username", searchUserByUsername);
  app.post("/api/user/new/profile-picture", upload.single("image"), setNewProfilePicture);
};

export default userRoutes;
