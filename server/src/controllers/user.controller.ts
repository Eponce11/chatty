import { Request, Response } from "express";



export const testFunc = (req: Request, res: Response) => {
  return res.json({msg: "Success"})
}

export const logoutUser = (req: Request, res: Response) => {
  res.clearCookie("userToken");
  res.sendStatus(200);
};
