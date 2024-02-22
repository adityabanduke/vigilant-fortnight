import express from "express";
import { register } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.js";
import cloudinary from "../utils/cloudinary.js";

const router = express.Router();
router.post("/register",upload.single('imagePath'), register);
//  router.post("/register", upload.single("imagePath"), function (req, res) {
//    cloudinary.uploader.upload(req.file.path, function (err, result) {
//      if (err) {
//        console.log(err);
//        return res.status(500).json({
//          success: false,
//          message: "Error",
//        });
//      }

//      res.status(200).json({
//        success: true,
//        message: "Uploaded!",
//        data: result,
//      });
//    });
//  });


export default router;
