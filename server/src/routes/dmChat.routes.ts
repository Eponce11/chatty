import { Application } from "express";
import { createDmChat } from "../controllers/dmChat.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";

const dmChatRoutes = (app: Application) => {
  app.post("/api/dmChat/create", createDmChat);
};

export default dmChatRoutes;
