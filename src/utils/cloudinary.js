import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadVideoOnCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) return null;
    const result = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "video",
      format: "mp4",
      tags: "video",
    });
    console.log("result.url", result.url)
    return result;
  } catch (error) {
    fs.unlinkSync(localFilepath) // remove locally stored video file on failure or failed upload
    return null;
  }
};

export const uploadOnCloudinary = async (localFilepath) => {
  try {
    if (!localFilepath) return null;
    const result = await cloudinary.uploader.upload(localFilepath, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.log("Cloudinary upload error:", error.message);
    fs.unlinkSync(localFilepath);
    return null;
  }
};

// export const uploadFile = async (filePath, type) => {

//   let resourceType

//   switch (type) {
//     case "image":
//       resourceType = "image"
//       break

//     case "video":
//       resourceType = "video"
//       break

//     case "pdf":
//       resourceType = "raw"
//       break

//     default:
//       resourceType = "auto"
//   }

//   const result = await cloudinary.uploader.upload(filePath, {
//     resource_type: resourceType
//   })

//   return result
// }
