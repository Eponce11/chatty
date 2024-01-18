import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ServerChat from "../models/serverChat.model";

export const createServerChat = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { title, serverId } = req.body;

    ServerChat.create({
      title: title,
      messages: [],
      serverId: serverId,
    })
      .then((newServerChat) => {
        return res.json({ Msg: "Success" });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
);
