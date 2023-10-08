import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || null;
  if (!accessTokenSecret) return res.sendStatus(500);

  jwt.verify(token, accessTokenSecret, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    next();
  });
};

export default verifyJWT;