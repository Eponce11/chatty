import mongoose, { Schema, model } from "mongoose";

export interface Server {
  _id: mongoose.Schema.Types.ObjectId;
  title: string;
  image: string | null;
  members: mongoose.Schema.Types.ObjectId[];
  textChannels: mongoose.Schema.Types.ObjectId[];
  owner: mongoose.Schema.Types.ObjectId;
  inviteCode: string;
}

const ServerSchema = new Schema<Server>(
  {
    title: {
      type: String,
      required: [true, "is required"],
      minlength: [2, "must be at least 2 chars"],
    },
    image: {
      type: String || null,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    textChannels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServerChat",
        required: true,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
    },
    inviteCode: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 6,
    },
  },
  { timestamps: true }
);

const Server = model<Server>("Server", ServerSchema);

export default Server;
