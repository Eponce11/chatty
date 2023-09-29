import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const secret = process.env.JWT_SECRET;
  if (!secret) return;
  jwt.verify(req.cookies.userToken, secret, (err: any, payload: any) => {
    if (err) {
      res.status(401).json({ verified: false });
    } else {
      next();
    }
  });
};

export const generateToken = (id: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) return;

  return jwt.sign({ id }, secret, {
    expiresIn: "1d",
  });
};
