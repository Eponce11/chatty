import { Application } from "express";
import { createMessage } from "../controllers/message.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";

const messageRoutes = (app: Application) => {
  app.post("/api/message/create", verifyJWT, createMessage);
};

export default messageRoutes;
