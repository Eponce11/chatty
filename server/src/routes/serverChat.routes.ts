import { Application } from "express";
import {
  createServerChat,
  getAllServerChats,
  getOneChat,
} from "../controllers/serverChat.controller";

const serverChatRoutes = (app: Application) => {
  app.post("/api/serverChat/create", createServerChat);
  app.get("/api/serverChat/getAllChats/:_id", getAllServerChats);
  app.post("/api/serverChat/getOne", getOneChat);
};

export default serverChatRoutes;
