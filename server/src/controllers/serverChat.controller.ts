import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ServerChat from "../models/serverChat.model";
import Server from "../models/server.model";
import { ServerChat as ServerChatInterface } from "../models/serverChat.model";

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
    const server = await Server.findById({ _id: _id }).populate<{
      textChannels: ServerChatInterface[];
    }>("textChannels");
    if (!server) {
      return res.sendStatus(400);
    }

    console.log(server);
    return res.json({
      _id: server._id,
      title: server.title,
      textChannels: server.textChannels,
    });
  }
);
