import mongoose from 'mongoose';
import { z } from 'zod';

const selectedVariantValidationSchema = z.object({
  size: z.string().optional(),
  SKU: z.string({
    required_error: 'Product SKU is required!',
  }),
});

const cartItemValidationSchema = z.object({
  productId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: 'Invalid product ID.',
  }),
  quantity: z
    .number({
      required_error: 'Product quantity is required!',
    })
    .min(1, 'Quantity must be at least 1'),
    selectedVariant: selectedVariantValidationSchema,
    totalPrice: z.number()
});

const createCartValidationSChema = z.object({
  body: z.object({
    items: z.array(cartItemValidationSchema).default([])
  }),
});

export const CartValidation = {
  createCartValidationSChema,
};
