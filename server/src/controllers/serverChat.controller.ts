import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ServerChat, {
  ServerChat as ServerChatInterface,
} from "../models/serverChat.model";
import Server from "../models/server.model";

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

export const getAllServerChats = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.params;
    const server = Server.findById({ _id }).populate<{
      textChannels: ServerChatInterface[];
    }>("serverChats");
    if (!server) {
      return res.sendStatus(400);
    }

    return res.json({ ...server })
  }
);
