/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TProduct } from './product.interface';
import { createProductID } from './product.utils';
import { Product } from './product.model';
import { uploadMultipleImage } from '../../utils/sendImageToCloudinary';

const addProductIntoDB = async (files: any, payload: TProduct) => {
  // Get auto generate product id
  const autoGenerateProductId = createProductID(
    payload?.group,
    payload?.category,
    payload?.subCategory,
  );

  // Now check the product is already create in database
  const isProductExists = await Product.findOne({
    productId: autoGenerateProductId,
  });
  if (isProductExists) {
    throw new AppError(httpStatus.CONFLICT, 'This product is already created!');
  }

  // now set the product id
  payload.productId = autoGenerateProductId;

  //Now upload the product image
  const uploadImages = await uploadMultipleImage(files);

  // Set product thumbnails
  payload.productThumbnail = uploadImages[0];

  // Set product images
  payload.productImages = uploadImages;

  // Create product in database
  const data = await Product.create(payload);

  return data;
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  
  const productSearchableField = ['productId', 'title'];

  let searchTerm = '';

  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string;
  };

  const searchQuery = Product.find({
    $or: productSearchableField.map((field) => ({
      [field]: {$regex: searchTerm, $options: 'i'}
    }))
  });

  return searchQuery;
  
};

export const ProductServices = {
  addProductIntoDB,
  getAllProductFromDB,
};
