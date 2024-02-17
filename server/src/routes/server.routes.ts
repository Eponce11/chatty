import { Application } from "express";
import { createServer } from "../controllers/server.controller";
import { upload } from "../config/s3.config";

const serverRoutes = (app: Application) => {
  app.post("/api/server/create", upload.single("image"), createServer);
};

export default serverRoutes;
