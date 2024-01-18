import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Server from "../models/server.model";
import ServerChat from "../models/serverChat.model";

export const createServer = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { title, image, userId } = req.body;
    
    // create image if exists

    let newServer;

    try {
      newServer = await Server.create({
        title: title,
        image: image ? image : null,
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

    Server.findByIdAndUpdate(
      { _id: newServer._id },
      { $push: { textChannels: newServerChat._id } },
      { new: true }
    );

    return res.json({ Msg: "Success" })
  }
);
