import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Message from "../models/message.model";
import DmChat from "../models/dmChat.model";

export const createMessage = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { to, from, message, chatId } = req.body;

    const newMessage = await Message.create({
      text: message,
      users: [from, to],
      sender: from,
    });

    if (!newMessage) res.sendStatus(400);

    DmChat.findByIdAndUpdate(
      { _id: chatId },
      { $push: { messages: newMessage._id } }
    )
      .then((dmChat) => {
        return res.json({ Msg: "Success" });
      })
      .catch((err) => res.status(400).json({ err }));
  }
);

export const getChatMessages = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const chatId = req.params._id

    const dmChat = await DmChat.findById({ _id: chatId }).populate<{
      messages: Message[];
    }>("messages");

    if (!dmChat) return res.sendStatus(400);

    console.log(dmChat);

    return res.json({ messages: dmChat.messages })
  }
);
