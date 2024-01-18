import { Application } from "express";
import { createServer } from "../controllers/server.controller";

const serverRoutes = (app: Application) => {
  app.post("/api/server/create", createServer);
};

export default serverRoutes;
