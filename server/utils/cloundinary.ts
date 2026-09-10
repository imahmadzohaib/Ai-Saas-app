import {v2 as cloudinary} from 'cloudinary';



const { cloudinaryCloudName,cloudinaryApiKey,cloudinaryApiSecret } =useRuntimeConfig();

export const connectCloudinary = async ()=>{
    cloudinary.config({
        cloude_name:cloudinaryCloudName,
        api_key:cloudinaryApiKey,
        api_secrect:cloudinaryApiSecret
    })
}