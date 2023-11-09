import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import DmChat from "../models/dmChat.model";

import { User } from "../models/user.model";

export const createDmChat = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { user1, user2 } = req.body;

    DmChat.create({
      users: [user1, user2],
    })
      .then((newDmChat) => {
        return res.json(newDmChat);
      })
      .catch((err) => {
        console.log(err._message);
        return res.sendStatus(400);
      });
  }
);

export const getDmChats = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const _id = req.params._id;

    const dmChats = await DmChat.find({
      users: {
        $in: [_id],
      },
    }).populate<{ users: User[] }>("users");

    if (!dmChats) return res.sendStatus(400);

    const response = dmChats.map((dmChat) => {
      const [user1, user2] = dmChat.users;
      const otherUser = user1._id.toString() === _id ? user2 : user1

      return {
        chatId: dmChat._id,
        userId: otherUser._id,
        username: otherUser.username,
      }
    });

    return res.json(response)

  }
);

export const getOneDmChat = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const _id = req.params._id

    const dmChat = await DmChat.findById(_id)

    console.log(dmChat)
    return res.json(dmChat)
  }
)