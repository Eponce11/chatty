import { Application } from "express";
import { createDmRequest } from "../controllers/dmRequest.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";

const dmRequestRoutes = (app: Application) => {
  app.post("/api/dmRequest/create", createDmRequest);
};

export default dmRequestRoutes;
