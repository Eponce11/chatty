import { Application } from "express";
import {
  createDmRequest,
  getDmPending,
  getDmRequests,
  acceptDmRequest,
} from "../controllers/dmRequest.controller";
import verifyJWT from "../middleware/verifyJWT.middleware";

const dmRequestRoutes = (app: Application) => {
  app.post("/api/dmRequest/create", createDmRequest);
  app.get("/api/dmRequest/getRequests/:_id", getDmRequests);
  app.get("/api/dmRequest/getPending/:_id", getDmPending);
  app.post("/api/dmRequest/accept", acceptDmRequest);
};

export default dmRequestRoutes;
