import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
export interface User {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
  password: string;
  displayName: string;
  username: string;
  dob: string;
  directMessages: mongoose.Schema.Types.ObjectId[];
  refreshToken: string;
  profilePicture: string | null;
  servers: mongoose.Schema.Types.ObjectId[];
}

const UserSchema = new Schema<User>(
  {
    email: {
      type: String,
      required: [true, "is required"],
      validate: {
        validator: (val: any) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Invalid",
      },
    },
    password: {
      type: String,
      required: [true, "is required"],
      minlength: [8, "must be at least 8 chars"],
    },
    displayName: {
      type: String,
    },
    username: {
      type: String,
      required: [true, "is required"],
      minLength: [1, "must be at least 1 char"],
    },
    dob: {
      type: String,
      required: [true, "is required"],
    },
    directMessages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    refreshToken: {
      type: String,
    },
    profilePicture: {
      type: String || null,
    },
    servers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Server",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next): void {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

const User = model<User>("User", UserSchema);

export default User;
