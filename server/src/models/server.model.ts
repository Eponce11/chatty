import mongoose, { Schema, model, mongo } from "mongoose";

interface Server {
  title: string;
  image: string | null;
  members: mongoose.Schema.Types.ObjectId[];
  textChannels: mongoose.Schema.Types.ObjectId[];
  owner: mongoose.Schema.Types.ObjectId;
}

const ServerSchema = new Schema<Server>(
  {
    title: {
      type: String,
      required: [true, "is required"],
      minlength: [2, "must be at least 2 chars"]
    },
    image: {
      type: String || null,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      }
    ],
    textChannels: [],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
    } // needs to create new model
  }
)
/*
const Server = model<Server>("Server", ServerSchema);

export default Server;
*/