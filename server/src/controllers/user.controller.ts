import { Request, Response } from "express";
import { generateToken } from "../config/jwt.config";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

export const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password, confirmPassword, username } = req.body;
    const errors: any = {};

    if (password !== confirmPassword) {
      errors.confirmPassword = { message: "must match password" };
      return res.status(400).json({ errors });
    }

    const userEmail = await User.findOne({ email });
    const userUsername = await User.findOne({ username });

    // if users exist return errors
    if (userEmail || userUsername) {
      if (userEmail && userEmail.email === email)
        errors.email = { message: "in use" };
      if (userUsername && userUsername.username === username)
        errors.username = { message: "in use" };
      return res.status(400).json({ errors });
    }

    // create user with token
    User.create(req.body)
      .then((newUser) => {
        return res
          .cookie("userToken", generateToken(newUser.id), { httpOnly: true })
          .json({ id: newUser.id, username: newUser.username });
      })
      .catch((err) => {
        return res.status(400).json({ errors: err.errors });
      });
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      return res
        .cookie("userToken", generateToken(user.id), { httpOnly: true })
        .json({ id: user.id, username: user.username });
    }
    return res.status(400).json({ error: "Invalid Credentials" });
  }
);

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("userToken");
  res.sendStatus(200);
};
