import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  directMessages: mongoose.Schema.Types.ObjectId[];
  refreshToken: string;
}

const UserSchema = new Schema<User>(
  {
    firstName: {
      type: String,
      required: [true, "is required"],
      minlength: [2, "must be at least 2 chars"],
    },
    lastName: {
      type: String,
      required: [true, "is required"],
      minlength: [2, "must be at least 2 chars"],
    },
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
    username: {
      type: String,
      required: [true, "is required"],
      minLength: [1, "must be at least 1 char"],
    },
    directMessages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    refreshToken: {
      type: String
    }
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
