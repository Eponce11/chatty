import mongoose, { Schema, model } from "mongoose";

export interface ServerChat {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  messages: mongoose.Schema.Types.ObjectId[];
  serverId: mongoose.Schema.Types.ObjectId;
}

const ServerChatSchema = new Schema<ServerChat>(
  {
    title: {
      type: String,
      required: [true, "is required"],
      minlength: [1, "must be at least 1 chars"],
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
    serverId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const ServerChat = model<ServerChat>("ServerChat", ServerChatSchema);

export default ServerChat;
