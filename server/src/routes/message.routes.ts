import { Application } from "express";
import { createMessage, getChatMessages } from "../controllers/message.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";

const messageRoutes = (app: Application) => {
  app.post("/api/message/create", createMessage);
  app.get("/api/message/getChatMessage/:_chatId/:_from", getChatMessages)
};

export default messageRoutes;
