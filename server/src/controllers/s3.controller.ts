import { Request, Response } from "express";
import multer from "multer";
import { bucketName, s3 } from "../config/s3.config";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import sharp from "sharp";

const storage = multer.memoryStorage();
export const upload = multer({ storage });

const randomImageName = (bytes: number = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const getImage = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    // get all user chats
    const users: any[] = [];

    for (const user of users) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: "", // this is the image name
      };

      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
      user.imageUrl = url;
    }

    res.json({ users })
  }
);

export const uploadImage = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const buffer = await sharp(req.file?.buffer)
      .resize({ height: 1920, width: 1080, fit: "contain" })
      .toBuffer(); // resize image

    const imageName = randomImageName(); // store this in db to access image

    const params = {
      Bucket: bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: req.file?.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);

    res.json({ Msg: "Success" });
  }
);
