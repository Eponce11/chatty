import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Message from "../models/message.model";
import DmChat from "../models/dmChat.model";
import { getImage } from "./s3.controller";
import { User } from "../models/user.model";

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
        return res.json({
          messageId: newMessage._id,
          text: newMessage.text,
          fromSelf: true,
        });
      })
      .catch((err) => res.status(400).json({ err }));
  }
);

export const getChatMessages = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { chatId, from } = req.body;

    const dmChat = await DmChat.findById({ _id: chatId })
      .populate<{
        messages: Message[];
      }>("messages")
      .populate<{ users: User[] }>("users")
      .sort("messages");

    if (!dmChat) return res.sendStatus(400);

    const [user1, user2] = dmChat.users;
    const otherUser = user1._id.toString() === from ? user2 : user1;

    const responseMessages = dmChat.messages.map((message) => {
      return {
        messageId: message._id,
        text: message.text,
        fromSelf: message.sender.toString() === from,
      };
    });

    const profilePic =
      otherUser.profilePicture === null
        ? otherUser.profilePicture
        : await getImage(otherUser.profilePicture);

    const response = {
      userId: otherUser._id,
      username: otherUser.username,
      messages: responseMessages,
      userProfilePicture: profilePic,
      createdAt: otherUser.createdAt
    };
    // console.log(response);
    return res.json(response);
  }
);
