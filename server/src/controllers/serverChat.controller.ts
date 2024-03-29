import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import ServerChat from "../models/serverChat.model";
import Server from "../models/server.model";
import { ServerChat as ServerChatInterface } from "../models/serverChat.model";
import { ServerMessage as ServerMessageInterface } from "../models/serverMessage.model";

export const createServerChat = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { title, serverId } = req.body;

    let serverChat;

    try {
      serverChat = await ServerChat.create({
        title: title,
        messages: [],
        serverId: serverId,
      });
    } catch (err) {
      return res.status(400).json(err);
    }

    await Server.findByIdAndUpdate(
      { _id: serverId },
      { $push: { textChannels: serverChat._id } },
      { new: true }
    );

    return res.json({ _id: serverChat._id, title: serverChat.title });
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
    return res.json({
      _id: server._id,
      title: server.title,
      textChannels: server.textChannels,
    });
  }
);

export const getOneChat = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { channelId } = req.body;
    const serverChat = await ServerChat.findById({ _id: channelId })
      .populate<{
        messages: ServerMessageInterface[];
      }>("messages")
      .sort("messages");

    if (!serverChat) return res.sendStatus(400);

    console.log(serverChat);
    return res.json({
      _id: serverChat._id,
      title: serverChat.title,
      messages: serverChat.messages,
    });
  }
);
