import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary";
import { TProduct } from "./product.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
const addProductIntoDB = async(file: any, payload: TProduct) => {

    const imagePath = file.map((image: any) => ({
        imagePath: image.path,
        imageName: image.filename
    }));

    const uploadedFiles = await uploadImageToCloudinary(imagePath);

    payload.thumbnail = uploadedFiles[0].secure_url;
    payload.images = uploadedFiles.map((file) => file.secure_url);

    console.log(payload);
}


export const ProductServices = {
    addProductIntoDB
}