import mongoose from 'mongoose';
import { z } from 'zod';
import { ProductFor } from '../product/product.constant';

const selectedVariantValidationSchema = z.object({
  color: z.string().optional(),
  size: z.string().optional(),
  SKU: z.string({
    required_error: 'Product SKU is required!',
  }),
});

const cartItemValidationSchema = z.object({
  productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid product ID.',
  }),
  productTitle: z.string(),
  productThumbnail: z.string(),
  quantity: z
    .number({
      required_error: 'Product quantity is required!',
    })
    .min(1, 'Quantity must be at least 1'),
  selectedVariant: selectedVariantValidationSchema,
  totalPrice: z.number(),
  disscountRate: z.number(),
  productFor: z.enum([...ProductFor] as [string, ...string[]], {
    invalid_type_error: 'Product gender must be Men, Women, or Kids',
  }),
});

const createCartValidationSChema = z.object({
  body: z.object({
    items: z.array(cartItemValidationSchema).default([]),
  }),
});

export const CartValidation = {
  cartItemValidationSchema,
  createCartValidationSChema,
};
