import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
const PORT: Number = 8000;
const DB: String = "Chatty_db";

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// connect to db

// connect to route files

const server = app.listen(PORT, () =>
  console.log(`Listening on port: ${PORT}`)
);
