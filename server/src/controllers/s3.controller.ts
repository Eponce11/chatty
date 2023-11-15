import { Request, Response } from 'express';
import multer from 'multer';
import { bucketName, s3 } from '../config/s3.config';
import asyncHandler from "express-async-handler";


const storage = multer.memoryStorage()
export const upload = multer({ storage })


export const getProfilePicture = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {

  }
)