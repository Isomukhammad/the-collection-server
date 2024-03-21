import cloudinary from "../config/cloudinary";

export const uploadBase64 = async (base64: string) => {
  try {
    const response = await cloudinary.uploader.upload(base64, {
      resource_type: "image",
      format: "webp",
    });

    return response.secure_url;
  } catch (error: any) {
    console.error(error);
    return "";
  }
};
