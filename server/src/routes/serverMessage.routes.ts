import { Application } from "express";
import { createServerMessage, getServerChatMessages } from "../controllers/serverMessage.controller";

const serverMessageRoutes = (app: Application) => {
  app.post("/api/serverMessage/create", createServerMessage);
  app.post("/api/serverMessage/getServerMessages", getServerChatMessages);
};

export default serverMessageRoutes;
