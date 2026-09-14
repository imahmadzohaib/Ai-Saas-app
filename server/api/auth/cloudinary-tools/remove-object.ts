import {v2 as cloudinary} from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { incrementApiLimit } from '~~/server/services/user-api-limit';

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const file = formData.get("image") as File;
  const object = formData.get("object")


  if (!file) {
    throw createError({ statusCode: 400, statusMessage: "No image provided" });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await connectCloudinary()
  const uploadFromBuffer = (): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(

      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined)=>{

        if(error || !result){
            return reject(error || new Error("Upload Failed"));
        }
        resolve(result)
      }
    );
     uploadStream.end(buffer);
    });
  };
      const result = await uploadFromBuffer();
      const finalImageUrl = cloudinary.url(result.public_id,{
        transformation:[
            {
            effect: `gen_remove:${object}`
            }
        ],
        resource_type: "image",
        secure: true
      })

      await incrementApiLimit(event.context.user.id);
    
      return finalImageUrl;
});
