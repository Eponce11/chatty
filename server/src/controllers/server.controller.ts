import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Server from "../models/server.model";
import ServerChat from "../models/serverChat.model";
import { uploadImage } from "./s3.controller";
import User from "../models/user.model";
import { User as UserInterface } from "../models/user.model";

export const createServer = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { title, userId } = req.body;

    const serverExists = await Server.findOne({ owner: userId });
    if (serverExists) {
      return res.status(400).json({ Msg: "Already Own a Server" });
    }

    let newServer;

    try {
      newServer = await Server.create({
        title: title,
        image: null,
        members: [userId],
        textChannels: [],
        owner: userId,
      });
    } catch (err) {
      return res.status(400).json(err);
    }

    const newServerChat = await ServerChat.create({
      title: "General",
      messages: [],
      serverId: newServer._id,
    });

    let imageName = null;
    if (req.file) {
      imageName = await uploadImage(req.file);
    }

    await Server.findByIdAndUpdate(
      { _id: newServer._id },
      { $push: { textChannels: newServerChat._id }, image: imageName },
      { new: true }
    );

    await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { servers: newServer._id } },
      { new: true }
    );

    return res.json({ Msg: "Success" });
  }
);

export const getUserServers = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { _id } = req.params;
    const user = await User.findById({ _id: _id }).populate<{
      servers: UserInterface[];
    }>("servers");

    if (!user) {
      return res.sendStatus(400);
    }
    console.log(user.servers)
    return res.json({ servers: [...user.servers] });
  }
);
