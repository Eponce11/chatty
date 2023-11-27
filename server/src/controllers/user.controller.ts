import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";
import DmRequest from "../models/dmRequest.model";

export const testFunc = (req: Request, res: Response) => {
  return res.json({ msg: "Success" });
};

export const searchUserByUsername = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { username, userId } = req.body;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const request = await DmRequest.findOne({
      $or: [
        { sender: user._id, receiver: userId },
        { sender: userId, receiver: user._id },
      ],
    });

    const response = {
      userId: user._id,
      username: user.username,
      status: "NONE",
    };

    if (!request) {
      return res.json(response);
    }

    return res.json({
      ...response,
      status: request.sender.toString() === userId ? "PENDING" : "REQUEST",
    });
  }
);
