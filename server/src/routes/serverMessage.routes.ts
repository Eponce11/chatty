import { Application } from "express";
import { createServerMessage } from "../controllers/serverMessage.controller";

const serverMessageRoutes = (app: Application) => {
  app.post("/api/serverMessage/create", createServerMessage);
};

export default serverMessageRoutes;
