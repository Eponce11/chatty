import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import corsOptions from "./config/corsOptions.config";
import cookieParser from "cookie-parser";
import connectToDB from "./config/mongoose.config";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import messageRoutes from "./routes/message.routes";
import dmRequestRoutes from "./routes/dmRequest.routes";
import dmChatRoutes from "./routes/dmChat.routes";
import serverRoutes from "./routes/server.routes";
import serverChatRoutes from "./routes/serverChat.routes";
import s3Routes from "./routes/s3.routes";
import serverMessageRoutes from "./routes/serverMessage.routes";
import webSocket from "./webSocket";

const app: Application = express();
const PORT: Number = 8000;
const DB: String = "Chatty_db";

// middleware
dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

// connect to db
connectToDB(DB);

// connect to route files
authRoutes(app);
userRoutes(app);
messageRoutes(app);
dmRequestRoutes(app);
dmChatRoutes(app);
s3Routes(app);
serverRoutes(app);
serverChatRoutes(app);
serverMessageRoutes(app);

const server = app.listen(PORT, () =>
  console.log(`Listening on port: ${PORT}`)
);

webSocket(server);

export { app };
