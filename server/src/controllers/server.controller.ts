import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Server from "../models/server.model";
import ServerChat from "../models/serverChat.model";
import { uploadImage } from "./s3.controller";

export const createServer = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { title, userId } = req.body;

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

    return res.json({ Msg: "Success" });
  }
);
