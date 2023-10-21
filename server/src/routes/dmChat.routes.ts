import { Application } from "express";
import { createDmChat, getDmChats } from "../controllers/dmChat.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";

const dmChatRoutes = (app: Application) => {
  app.post("/api/dmChat/create", createDmChat);
  app.get("/api/dmChat/get/:_id", getDmChats);
};

export default dmChatRoutes;
