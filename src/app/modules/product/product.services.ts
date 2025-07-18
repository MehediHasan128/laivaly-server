import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TProduct } from './product.interface';
import { createProductID } from './product.utils';
import { Product } from './product.model';

const addProductIntoDB = async (payload: TProduct) => {
  
  // Get auto generate product id
  const autoGenerateProductId = createProductID(payload?.group, payload?.category, payload?.subCategory);

  // Now check the product is already create in database
  const isProductExists = await Product.findOne({productId: autoGenerateProductId});
  if(isProductExists){
    throw new AppError(httpStatus.CONFLICT, 'This product is already created!')
  };

  // now set the product id
  payload.productId = autoGenerateProductId;
  console.log(payload);
  // Now upload the product image

  // Create product in database
  // const data = await Product.create(payload)

};

export const ProductServices = {
  addProductIntoDB
};
