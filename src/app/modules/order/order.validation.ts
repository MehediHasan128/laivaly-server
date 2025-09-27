import { z } from 'zod';
import { shippingAddressValidationSchema } from '../../global/validation';

const orderItemsValidationSchema = z.object({
  productId: z.string(),
  productTitle: z
    .string()
    .min(1, { message: 'productTitle is required.' })
    .max(300, { message: 'productTitle is too long (max 300 characters).' }),
  productThumbnail: z
    .string()
    .url({ message: 'productThumbnail must be a valid URL.' }),
  quantity: z
    .number({
      invalid_type_error: 'quantity must be a number.',
    })
    .int({ message: 'quantity must be an integer.' })
    .min(1, { message: 'quantity must be at least 1.' }),
  selectedVariant: z.object({
    color: z.string().optional(),
    size: z.string().optional(),
    SKU: z.string(),
  }),
  totalPrice: z
    .number({
      invalid_type_error: 'totalPrice must be a number.',
    })
    .refine((n) => Number.isFinite(n), {
      message: 'totalPrice must be a finite number.',
    }),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    orderItems: z.array(orderItemsValidationSchema),
    shippingCharge: z.number({
      invalid_type_error: 'shippingCharge must be a number.',
    }),
    grandTotal: z.number({
      invalid_type_error: 'grandTotal must be a number.',
    }),
    shippingMethod: z.enum(['standard', 'second Day', 'overnight']),
    shippingAddress: shippingAddressValidationSchema,
    paymentMethod: z.enum(['stripe', 'sslcommerz', 'cod']),
    paymentStatus: z
      .enum(['pending', 'paid', 'failed', 'refunded'])
      .default('pending'),
    orderStatus: z
      .enum(['processing', 'shipped', 'delivered', 'cancelled', 'returned'])
      .default('processing'),
  }),
});

export const OrderValidation = {
  createOrderValidationSchema,
};
