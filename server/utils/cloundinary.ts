import { v2 as cloudinary } from "cloudinary";

export const connectCloudinary = () => {
  const config = useRuntimeConfig();

  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
  });

  return cloudinary;
};