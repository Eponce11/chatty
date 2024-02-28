import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Server from "../models/server.model";
import ServerChat from "../models/serverChat.model";
import { uploadImage, getImage } from "./s3.controller";
import User from "../models/user.model";
import { User as UserInterface } from "../models/user.model";
import { Server as ServerInterface } from "../models/server.model";

const makeInviteCode = (): string => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

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
        inviteCode: makeInviteCode(),
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
      servers: ServerInterface[];
    }>("servers");

    if (!user) {
      return res.sendStatus(400);
    }

    const response = await Promise.all(
      user.servers.map(async (server) => {
        const serverImage =
          server.image === null ? null : await getImage(server.image);
        return {
          _id: server._id,
          title: server.title,
          image: serverImage,
        };
      })
    );

    console.log(response);
    return res.json({ servers: [...response] });
  }
);

export const getOneServer = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { serverId } = req.body;

    const server = await Server.findById({ _id: serverId }).populate<{
      members: UserInterface[];
    }>("members");

    if (!server) return res.sendStatus(400);

    const members = await Promise.all(
      server.members.map(async (member) => {
        const profilePicture =
          member.profilePicture === null
            ? null
            : await getImage(member.profilePicture);

        return {
          _id: member._id,
          username: member.username,
          profilePicture: profilePicture,
        };
      })
    );

    console.log(server);

    return res.json({ _id: server?._id, members: members });
  }
);

export const joinServer = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { inviteCode, userId } = req.body;

    const userInServer = await Server.findOne({
      inviteCode: inviteCode,
      members: { $in: [userId] },
    });

    const server = await Server.findOneAndUpdate(
      { inviteCode: inviteCode },
      { $push: { members: userId } },
      { new: true }
    );

    if (!server) return res.sendStatus(400);

    const user = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { servers: server._id } },
      { new: true }
    );

    if (!user) return res.sendStatus(400);

    const serverImage =
      server.image === null ? null : await getImage(server.image);

    return res.json({
      _id: server._id,
      title: server.title,
      image: serverImage,
    });
  }
);
