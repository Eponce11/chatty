import { Application } from "express";
import { login, register } from "../controllers/auth.controller";

const authRoutes = (app: Application) => {
  app.post('/api/auth/login', login);
  app.post('/api/auth/register', register);
};

export default authRoutes;
