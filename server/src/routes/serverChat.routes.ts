import { Application } from "express";
import {
  createServerChat,
  getAllServerChats,
  getOneChat,
} from "../controllers/serverChat.controller";

const serverChatRoutes = (app: Application) => {
  app.post("/api/server/create", createServerChat);
  app.get("/api/serverChat/getAllChats/:_id", getAllServerChats);
  app.get("/api/serverChat/getOne/:_id", getOneChat);
};

export default serverChatRoutes;
