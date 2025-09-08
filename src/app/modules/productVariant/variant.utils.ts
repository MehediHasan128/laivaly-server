import { Product } from '../product/product.model';
import { TVariants } from './variant.interface';
import { GetColorName } from 'hex-color-to-color-name';
import crypto from 'crypto';

export const genarateProductSKU = async (
  productId: string,
  payload: TVariants,
) => {
  const existingProduct = await Product.findById(productId).select(
    '-_id parentProductId',
  );
  // Now get the group category and sub categofey code
  const groupAndCategoryCode = existingProduct?.parentProductId.slice(3, 6);

  //   get product color and size
  let productColor = null;
  if (payload?.color) {
    productColor = GetColorName(payload?.color as string).toUpperCase();
  }
  let productSize = null;
  if (payload?.size) {
    productSize = payload?.size?.toUpperCase();
  }

  //   now generate 3 digit random hex code
  const variantCode = crypto.randomBytes(2).toString('hex').toUpperCase();

  let SKU = '';

  if (payload?.color && payload?.size) {
    SKU = `${groupAndCategoryCode}-${productColor}-${variantCode}-${productSize}`;
  } else if (payload?.color) {
    SKU = `${groupAndCategoryCode}-${productColor}-${variantCode}`;
  } else if (payload?.size) {
    SKU = `${groupAndCategoryCode}-${variantCode}-${productSize}`;
  } else {
    SKU = `${groupAndCategoryCode}-${variantCode}`;
  }

  return SKU;
};
