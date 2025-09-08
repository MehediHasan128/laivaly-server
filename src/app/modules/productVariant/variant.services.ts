import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { TVariants } from './variant.interface';
import httpStatus from 'http-status';
import { Variant } from './variant.model';
import { genarateProductSKU } from './variant.utils';

const addProductVariantIntoDB = async (
  productId: string,
  payload: TVariants,
) => {
  // Check the product is exist on database
  const isProductExist = await Product.findById(productId);
  if (!isProductExist) {
    throw new AppError(httpStatus.CONFLICT, 'Product not found!');
  }

  //   Check the product is delete
  const isDelete = isProductExist?.isDeleted;
  if (isDelete) {
    throw new AppError(httpStatus.CONFLICT, 'Product not found!');
  }

  const productSku = await genarateProductSKU(productId, payload);
  payload.SKU = productSku;

  //   Now check the variant is alrady exit
  const isVariantExist = await Variant.findOne(
    {
      'variants.size': payload?.size,
      'variants.color': payload?.color,
      'variants.SKU': payload?.SKU,
    },
    { 'variants.$': 1 },
  );
  if (isVariantExist) {
    throw new AppError(httpStatus.CONFLICT, 'This variant is already added!');
  }

  // Now add product variant
  await Variant.findOneAndUpdate(
    { productId },
    { $push: { variants: payload } },
    { new: true },
  );
};

export const VariantServices = {
  addProductVariantIntoDB,
};
