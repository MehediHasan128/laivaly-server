import mongoose from 'mongoose';
import { z } from 'zod';

const CartItemValidationSchema = z.object({
  productId: z.custom<mongoose.Types.ObjectId>(
    (val) => mongoose.Types.ObjectId.isValid(val),
    {
      message: 'Invalid product ID.',
    },
  ),
  color: z.string().trim().optional(),
  size: z.string().trim().optional(),
  quantity: z
    .number({
      required_error: 'Quantity is required in cart item.',
      invalid_type_error: 'Quantity must be a number.',
    })
    .min(1, { message: 'Quantity must be at least 1.' }),
});

const CartValidationSchema = z.object({
  body: z.object({
    userId: z.custom<mongoose.Types.ObjectId>(
      (val) => mongoose.Types.ObjectId.isValid(val),
      {
        message: 'Invalid user ID.',
      },
    ),
    items: z
      .array(CartItemValidationSchema, {
        required_error: 'Cart must contain at least one item.',
        invalid_type_error: 'Items must be an array of cart items.',
      })
      .min(1, { message: 'Cart must have at least one item.' }),
  }),
});

export const CartValidation = { CartValidationSchema };
