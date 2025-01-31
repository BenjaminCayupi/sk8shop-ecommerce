"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const uploadProductImages = async (images: FileList) => {
  console.log("images from function :", images);
  try {
    const formImages = Array.from(images) as File[];
    const uploadPromises = formImages.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");
        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            fetch_format: "auto",
            quality: "auto",
          })
          .then((r) => r.secure_url);
      } catch {
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    console.log("uploadedImages :", uploadedImages);
    return uploadedImages;
  } catch (error) {
    console.log("error :", error);
  }
};
