import mongoose, { Schema, model } from "mongoose";

export interface ServerMessage {
  _id: mongoose.Schema.Types.ObjectId;
  text: string;
  serverChat: mongoose.Schema.Types.ObjectId;
  sender: mongoose.Schema.Types.ObjectId;
}

const ServerMessageSchema = new Schema<ServerMessage>(
  {
    text: {
      type: String,
      required: true,
    },
    serverChat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServerChat",
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
