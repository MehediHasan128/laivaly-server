/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { TProduct } from './product.interface';
import { createProductID } from './product.utils';
import { Product } from './product.model';
import { uploadMultipleImage } from '../../utils/sendImageToCloudinary';
import QueryBuilder from '../../builder/QueryBuilder';

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

const updateProductIntoDB = async (
  productId: string,
  payload: Partial<TProduct>,
) => {
  // Check the is is given or not
  if (!productId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product ID is required!');
  }

  // Check the product is exist or not
  const isProductExists = await Product.findOne({ productId });
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  // Check the product is already delete
  const isProductDelete = isProductExists?.isDeleted;
  if (isProductDelete) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product is already delete!');
  }

  const data = await Product.findOneAndUpdate({ productId }, payload, {new: true});
  return data
};

const productStockEntryIntoDB = async(productId: string, productSKU: string, quantity: string) => {

  // Check the is is given or not
  if (!productId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product ID is required!');
  };

  // Check the product is exist or not
  const isProductExists = await Product.findOne({ productId });
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  };

  // Check the product is already delete
  const isProductDelete = isProductExists?.isDeleted;
  if (isProductDelete) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product is already delete!');
  };
  
  const productVerient = isProductExists?.variants?.find((ver) => ver?.SKU === productSKU);
  if (!productVerient) {
    throw new AppError(httpStatus.NOT_FOUND, 'The specified product variant could not be found. Please check the SKU and try again!');
  };

  productVerient.stock += Number(quantity);

  await isProductExists.save();

}

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(['productId', 'title'])
    .filter()
    .sort()
    .paginate();

  const meta = await productQuery.countTotal();
  const data = await productQuery.queryModel;

  return {
    meta,
    data,
  };
};

const getSingleProductFromDB = async (productId: string) => {
  // Check the is is given or not
  if (!productId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product ID is required!');
  }

  // Check the product is exist or not
  const isProductExists = await Product.findOne({ productId });
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  return isProductExists;
};

const deleteSingleProductIntoDB = async (productId: string) => {
  // Check the is is given or not
  if (!productId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product ID is required!');
  }

  // Check the product is exist or not
  const isProductExists = await Product.findOne({ productId });
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  // Check the product is already delete
  const isProductDelete = isProductExists?.isDeleted;
  if (isProductDelete) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Product is already delete!');
  }

  await Product.findOneAndUpdate({ productId }, { isDeleted: true });
};

export const ProductServices = {
  addProductIntoDB,
  updateProductIntoDB,
  productStockEntryIntoDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  deleteSingleProductIntoDB,
};
