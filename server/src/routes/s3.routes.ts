import { Application } from "express";
import { getImage, uploadImage } from "../controllers/s3.controller";
import { upload } from "../config/s3.config";

const s3Routes = (app: Application) => {
  // app.get("/api/s3/getImage", getImage);
  app.post("/api/s3/uploadImage", upload.single("image"), uploadImage);
};

export default s3Routes;
