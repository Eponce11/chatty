import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import DmRequest from "../models/dmRequest.model";

import { User } from "../models/user.model";

export const createDmRequest = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { from, to } = req.body;

    DmRequest.create({
      receiver: to,
      sender: from,
    })
      .then((newDmRequest) => {
        return res.json(newDmRequest);
      })
      .catch((err) => {
        console.log(err._message);
        return res.sendStatus(400);
      });
  }
);

export const getDmRequests = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const _id = req.params._id;

    const dmRequests = await DmRequest.find({ receiver: _id }).populate<{
      sender: User;
    }>("sender");

    if (!dmRequests) return res.sendStatus(400);

    const response = dmRequests.map((dmRequest) => {
      const { sender } = dmRequest;
      return {
        dmRequestId: dmRequest._id,
        userId: sender._id,
        username: sender.username,
      };
    });

    return res.json(response);
  }
);

export const getDmPending = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const _id = req.params._id;

    const dmPending = await DmRequest.find({ sender: _id }).populate<{
      receiver: User;
    }>("receiver");

    if (!dmPending) return res.sendStatus(400);

    const response = dmPending.map((pending) => {
      const { receiver } = pending;

      return {
        dmRequestId: pending._id,
        userId: receiver._id,
        username: receiver.username,
      };
    });
    return res.json(response)
  }
);
