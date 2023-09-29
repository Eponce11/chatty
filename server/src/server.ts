import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDB from "./config/mongoose.config";
import userRoutes from "./routes/user.routes";

const app: Application = express();
const PORT: Number = 8000;
const DB: String = "Chatty_db";

// middleware
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// connect to db
connectToDB(DB);

// connect to route files
userRoutes(app);

const server = app.listen(PORT, () =>
  console.log(`Listening on port: ${PORT}`)
);