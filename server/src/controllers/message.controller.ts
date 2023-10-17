import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Message from "../models/message.model";

export const createMessage = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { to, from, message } = req.body;

    const newMessage = await Message.create({
      text: message,
      users: [from, to],
      sender: from,
    });

    if (!newMessage) res.sendStatus(400);

    return res.json({ message: newMessage.text });
  }
);
