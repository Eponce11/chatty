import mongoose, { Schema, model } from "mongoose";

interface ServerMessage {
  _id: mongoose.Schema.Types.ObjectId;
  text: string;
  server: mongoose.Schema.Types.ObjectId;
  sender: mongoose.Schema.Types.ObjectId;
}

const ServerMessageSchema = new Schema<ServerMessage>(
  {
    text: {
      type: String,
      required: true,
    },
    server: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Server",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const ServerMessage = model<ServerMessage>("ServerMessage", ServerMessageSchema);

export default ServerMessage;
