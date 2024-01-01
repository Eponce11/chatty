import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { getImage } from "./s3.controller";
import User from "../models/user.model";

export const register = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, username } = req.body;
    const errors: any = {};

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

    User.create(req.body)
      .then((newUser) => {
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
                sameSite: "none",
                secure: true,
              })
              .json({
                id: updatedUser?._id,
                username: updatedUser?.username,
                token: accessToken,
                profilePicture: updatedUser?.profilePicture,
              });
          })
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ error: " - Login or password is invalid." });
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
      .then(async (updatedUser) => {
        const profilePic =
          typeof updatedUser?.profilePicture === "string"
            ? await getImage(updatedUser?.profilePicture)
            : updatedUser?.profilePicture;

        return res
          .cookie("jwt", refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
          })
          .json({
            id: updatedUser?._id,
            username: updatedUser?.username,
            token: accessToken,
            profilePicture: profilePic,
          });
      })
      .catch((err) => res.status(400).json({ err }));
  }
);

export const handleRefreshToken = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const user = await User.findOne({ refreshToken });
    if (!user) return res.sendStatus(403);
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || null;
    if (!refreshTokenSecret) return res.sendStatus(500);
    jwt.verify(refreshToken, refreshTokenSecret, (err: any, decoded: any) => {
      if (err || user.id !== decoded.id) return res.sendStatus(403);
      const accessToken = generateToken({ id: user.id }, "access");
      res.json({ accessToken });
    });
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken });
    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.sendStatus(204);
    }

    await User.findByIdAndUpdate(
      { _id: user.id },
      { refreshToken: "" },
      { new: true }
    );

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }
);

// generate jwt tokens
const generateToken = (payload: { id: String }, tokenType: String) => {
  if (tokenType === "access") {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) return null;
    return jwt.sign({ id: payload.id }, accessTokenSecret, {
      expiresIn: "15m",
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
