/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { TVariants } from './variant.interface';
import httpStatus from 'http-status';
import { Variant } from './variant.model';
import { genarateProductSKU } from './variant.utils';
import { uploadMultipleImage } from '../../utils/sendImageToCloudinary';

const addProductVariantIntoDB = async (
  files: any,
  productId: string,
  payload: TVariants,
) => {
  // Check the product is exist or not
  const isProductExist = await Product.findById(productId);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  // Cheke the product is delete or not
  const isProductDelete = isProductExist?.isDeleted;
  if (isProductDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'Product already deleted!');
  }

  // Check the variants is exists or not
  const isVariantExist = await Variant.findOne({
    productId: productId,
    'variants.color': payload?.color,
  });


  if (isVariantExist) {
    throw new AppError(httpStatus.CONFLICT, 'This variant is already added!');
  }

  // Now upload the product Images
  const uploadImages = await uploadMultipleImage(files);
  payload.images = uploadImages;

  await genarateProductSKU(productId, payload);

  // Now add product variant
  await Variant.findOneAndUpdate(
    { productId },
    { $push: { variants: payload } },
    { new: true },
  );
};

const getProductVariantFromDB = async (variantId: string) => {
  const data = await Variant.findById(variantId);
  const productVariants = data?.variants;
  return productVariants;
};

export const VariantServices = {
  addProductVariantIntoDB,
  getProductVariantFromDB,
};