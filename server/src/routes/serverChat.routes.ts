import { Application } from "express";
import {
  createServerChat,
  getAllServerChats,
} from "../controllers/serverChat.controller";

const serverChatRoutes = (app: Application) => {
  app.post("/api/server/create", createServerChat);
  app.get("/api/serverChat/getAllChats/:_id", getAllServerChats);
};

export default serverChatRoutes;
