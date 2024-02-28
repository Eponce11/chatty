import { Application } from "express";
import {
  createServer,
  getUserServers,
  getOneServer,
  joinServer,
} from "../controllers/server.controller";
import { upload } from "../config/s3.config";

const serverRoutes = (app: Application) => {
  app.post("/api/server/create", upload.single("image"), createServer);
  app.get("/api/server/getAll/:_id", getUserServers);
  app.post("/api/server/getOne", getOneServer);
  app.post("/api/server/join", joinServer);
};

export default serverRoutes;
