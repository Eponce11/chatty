import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../models/user.model";

export const register = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password, confirmPassword, username } = req.body;
    const errors: any = {};

    if (password !== confirmPassword) {
      errors.confirmPassword = { message: "must match password" };
      return res.status(400).json({ errors });
    }

    const potentialUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (potentialUser) {
      if (potentialUser.email === email) {
        errors.email = { message: "in use" };
      }
      if (potentialUser.username === username) {
        errors.username = { message: "in use" };
      }
      return res.status(400).json({ errors });
    }

    const newUser = await User.create(req.body);

    const accessToken = generateToken({ id: newUser.id }, "access");
    const refreshToken = generateToken({ id: newUser.id }, "refresh");
    if (!accessToken || !refreshToken) return res.sendStatus(500);

    User.findByIdAndUpdate(
      { _id: newUser.id },
      { refreshToken: refreshToken },
      { new: true }
    )
      .then((updatedUser) => {
        return res
          .cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          })
          .json({ accessToken });
      })
      .catch((err) => res.status(400).json({ err }));
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const accessToken = generateToken({ id: user.id }, "access");
    const refreshToken = generateToken({ id: user.id }, "refresh");
    if (!accessToken || !refreshToken) return res.sendStatus(500);

    // set refresh token in db and respond with access token
    User.findByIdAndUpdate(
      { _id: user.id },
      { refreshToken: refreshToken },
      { new: true }
    )
      .then((updatedUser) => {
        return res
          .cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
          })
          .json({ accessToken });
      })
      .catch((err) => res.status(400).json({ err }));
  }
);

// generate jwt tokens
const generateToken = (payload: { id: String }, tokenType: String) => {
  if (tokenType === "access") {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) return null;
    return jwt.sign({ id: payload.id }, accessTokenSecret, {
      expiresIn: "30s",
    });
  }
  if (tokenType === "refresh") {
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    if (!refreshTokenSecret) return null;
    return jwt.sign({ id: payload.id }, refreshTokenSecret, {
      expiresIn: "1d",
    });
  }
  return null;
};
