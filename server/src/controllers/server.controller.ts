import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Server from "../models/server.model";

export const createServer = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { title, image, userId } = req.body;

    // need to create a default text channel
    // create image if exists
    Server.create({
      title: title,
      image: image ? image : null,
      members: [userId],
      textChannels: [],
      owner: userId,
    })
      .then((newServer) => {
        return res.json({ Msg: "Success" });
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
);
