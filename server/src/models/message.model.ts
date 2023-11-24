import mongoose, { Schema, model } from "mongoose";

interface Message {
  _id: mongoose.Schema.Types.ObjectId;
  text: string;
  users: mongoose.Schema.Types.ObjectId[];
  sender: mongoose.Schema.Types.ObjectId;
}

const MessageSchema = new Schema<Message>(
  {
    text: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Message = model<Message>("Message", MessageSchema);

export default Message;
