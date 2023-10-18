import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import DmRequest from "../models/dmRequest.model";

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
        console.log(err._message)
        return res.sendStatus(400);
      });
  }
);
