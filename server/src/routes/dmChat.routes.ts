import { Application } from "express";
import { createDmChat, getDmChats, getOneDmChat } from "../controllers/dmChat.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";

const dmChatRoutes = (app: Application) => {
  app.post("/api/dmChat/create", createDmChat);
  app.get("/api/dmChat/get/:_id", getDmChats);
  app.get("/api/dmChat/getOne/:_id", getOneDmChat);
};

export default dmChatRoutes;
