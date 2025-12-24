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

  const color = payload?.color;
  const sizes = payload?.sizes;

  let SKU = '';
  const sizesWithSKU = [];
  //   get product color and size
  let productColor = null;
  if (color) {
    productColor = GetColorName(color.toUpperCase());
  }

  let productSize = null;
  for (const size of sizes) {
    productSize = size.size?.toUpperCase();

    //  now generate 3 digit random hex code
    const variantCode = crypto.randomBytes(2).toString('hex').toUpperCase();

    if (payload.color && size.size) {
      SKU = `${groupAndCategoryCode}-${productColor}-${variantCode}-${productSize}`;
    } else if (payload?.color) {
      SKU = `${groupAndCategoryCode}-${productColor}-${variantCode}`;
    } else if (size.size) {
      SKU = `${groupAndCategoryCode}-${variantCode}-${productSize}`;
    } else {
      SKU = `${groupAndCategoryCode}-${variantCode}`;
    }

    size.SKU = SKU;
    sizesWithSKU.push(size);
  }

  payload.sizes = sizesWithSKU;

  return payload;
};
