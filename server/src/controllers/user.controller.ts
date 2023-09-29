import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/user.model";

export const createUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password, confirmPassword, username } = req.body;

    if (password !== confirmPassword) return res.status(400).json({confirmPassword: { message: "must match password" }})
    
    const userEmail = await User.findOne({ email })
    const userUsername = await User.findOne({ username })

  }
);
