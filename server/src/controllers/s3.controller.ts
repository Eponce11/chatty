import { bucketName, s3 } from "../config/s3.config";
import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import sharp from "sharp";

const randomImageName = (bytes: number = 32) =>
  crypto.randomBytes(bytes).toString("hex");

export const getImage = async (imgName: string): Promise<any> => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: imgName,
  };

  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return url;
};

export const uploadImage = async (file: any): Promise<any> => {
  const buffer = await sharp(file.buffer)
    .resize({ height: 300, width: 300, fit: "fill" })
    .toBuffer(); // resize image

  const imageName = randomImageName(); // store this in db to access image

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  try {
    await s3.send(command);
    return imageName;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const deleteImage = async (imageName: string): Promise<any> => {
  const params = {
    Bucket: bucketName,
    Key: imageName,
  };

  const command = new DeleteObjectCommand(params);

  try {
    await s3.send(command);
    return { Msg: "Success" };
  } catch (err) {
    console.log(err);
    return null;
  }
};
