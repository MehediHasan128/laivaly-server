import { Types } from 'mongoose';
import { z } from 'zod';
import { shippingAddressValidationSchema } from '../../global/validation';

const orderItemsValidationSchema = z.object({
  productId: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: 'Invalid ObjectId format.',
  }),
  quantity: z
    .number({ required_error: 'Quantity is required for each order item.' })
    .min(1, 'Quantity must be at least 1.'),
  size: z.string().optional(),
  color: z.string().optional(),
  SKU: z.string({ required_error: 'SKU is required for each order item.' }),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId format.',
    }),
    orderItems: z
      .array(orderItemsValidationSchema)
      .min(1, 'Order must contain at least one item.'),
    shippingAddress: shippingAddressValidationSchema,
    paymentMethod: z.enum(['stripe', 'sslcommerz', 'cod'], {
      required_error: 'Payment method is required.',
      invalid_type_error: 'Invalid payment method.',
    })
  }),
});

export const OrderValidation = {
  createOrderValidationSchema,
};
