import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ServerMessage from "../models/serverMessage.model";
import ServerChat from "../models/serverChat.model";
import { ServerMessage as ServerMessageInterface } from "../models/serverMessage.model";

export const createServerMessage = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { from, message, channelId } = req.body;

    console.log(from, message, channelId);
    const newServerMessage = await ServerMessage.create({
      text: message,
      sender: from,
      serverChat: channelId,
    });
    if (!newServerMessage) res.sendStatus(400);

    ServerChat.findByIdAndUpdate(
      { _id: channelId },
      { $push: { messages: newServerMessage._id } }
    )
      .then((serverChat) => {
        return res.json(newServerMessage);
      })
      .catch((err) => res.status(400).json({ err }));
  }
);
