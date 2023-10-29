import mongoose, { Schema, model } from "mongoose";

interface DmChat {
  users: mongoose.Schema.Types.ObjectId[];
  messages: mongoose.Schema.Types.ObjectId[];
}

const DmChatSchema = new Schema<DmChat>(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const DmChat = model<DmChat>("DmChat", DmChatSchema);

export default DmChat;
