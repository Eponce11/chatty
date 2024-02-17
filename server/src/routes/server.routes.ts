import { Application } from "express";
import { createServer, getUserServers } from "../controllers/server.controller";
import { upload } from "../config/s3.config";

const serverRoutes = (app: Application) => {
  app.post("/api/server/create", upload.single("image"), createServer);
  app.get("/api/server/getAll/:_id", getUserServers);
};

export default serverRoutes;
