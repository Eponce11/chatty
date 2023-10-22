import { Application } from "express";
import { createDmRequest, getDmPending, getDmRequests } from "../controllers/dmRequest.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";

const dmRequestRoutes = (app: Application) => {
  app.post("/api/dmRequest/create", createDmRequest);
  app.get("/api/dmRequest/getRequests/:_id", getDmRequests)
  app.get("/api/dmRequest/getPending/:_id", getDmPending)
};

export default dmRequestRoutes;
