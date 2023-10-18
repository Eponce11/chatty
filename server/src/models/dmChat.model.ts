import mongoose, { Schema, model } from "mongoose";

interface DmChat {
  users: mongoose.Schema.Types.ObjectId[];
  messages: string[];
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
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const DmChat = model<DmChat>("DmChat", DmChatSchema);

export default DmChat;
