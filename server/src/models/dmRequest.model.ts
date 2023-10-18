import mongoose, { Schema, model } from "mongoose";

interface DmRequest {
  receiver: mongoose.Schema.Types.ObjectId;
  sender: mongoose.Schema.Types.ObjectId;
}

const DmRequestSchema = new Schema<DmRequest>(
  {
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

const DmRequest = model<DmRequest>("DmRequest", DmRequestSchema);

export default DmRequest;