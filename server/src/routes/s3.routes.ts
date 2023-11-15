import { Application } from "express";
import { upload } from "../controllers/s3.controller";

const s3Routes = (app: Application) => {
  app.post('/api/s3/newImage', upload.single('image'), )
}