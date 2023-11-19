import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';

const bucketName = process.env.BUCKET_NAME || ''
const bucketRegion = process.env.BUCKET_REGION || ''
const accessKey = process.env.ACCESS_KEY || ''
const secretAccessKey = process.env.SECRET_ACCESS_KEY || ''

const storage = multer.memoryStorage();
const upload = multer({ storage })

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey
  },
  region: bucketRegion
})

export {
  bucketName, s3, upload
}