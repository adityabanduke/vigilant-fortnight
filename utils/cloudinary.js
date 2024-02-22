import { v2 as cloudinary } from "cloudinary";
// const cloudinary = require("cloudinary").v2;


cloudinary.config({
  cloud_name: 'aditya-cloud',
  api_key: "257497453395613",
  api_secret: "_O-UMeGD3WJ52netUnprfCiyzi0",
});

// module.export = cloudinary;
export default cloudinary;
