import AppError from '../../errors/AppError';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';
import { TProduct } from './product.interface';
import { Product } from './product.model';
import httpStatus from 'http-status';

/* eslint-disable @typescript-eslint/no-explicit-any */
const addProductIntoDB = async (file: any, payload: TProduct) => {
  // Check the product is exists or not
  const isExistsProduct = await Product.findOne({ SKU: payload.SKU });
  if (isExistsProduct) {
    throw new AppError(httpStatus.CONFLICT, 'This product is already exists');
  }

  const imagePath = file.map((image: any) => ({
    imagePath: image.path,
    imageName: image.filename,
  }));

  const uploadedFiles = await uploadImageToCloudinary(imagePath);

  payload.thumbnail = uploadedFiles[0].secure_url;
  payload.images = uploadedFiles.map((file) => file.secure_url);

  const data = await Product.create(payload);

  return data;
};

export const ProductServices = {
  addProductIntoDB,
};
