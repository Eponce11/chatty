import { Application } from "express";
import { createServerChat } from "../controllers/serverChat.controller";

const serverChatRoutes = (app: Application) => {
  app.post("/api/server/create", createServerChat);
};

export default serverChatRoutes;
