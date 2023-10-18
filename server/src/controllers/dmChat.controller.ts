import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import DmChat from "../models/dmChat.model";

export const createDmChat = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { user1, user2 } = req.body;

    DmChat.create({
      users: [user1, user2]
    })
      .then((newDmChat) => {
        return res.json(newDmChat);
      })
      .catch((err) => {
        console.log(err._message)
        return res.sendStatus(400);
      });
  }
);