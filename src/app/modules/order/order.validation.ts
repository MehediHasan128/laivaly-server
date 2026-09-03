import { z } from 'zod';
import { shippingAddressValidationSchema } from '../../global/validation';

const orderItemsValidationSchema = z.object({
  productId: z
    .string({ required_error: 'Product ID is required' })
    .regex(/^[0-9a-fA-F]{24}$/, 'Invalid product ID format'),
  title: z
    .string({ required_error: 'Product title is required' })
    .min(1, 'Product title cannot be empty'),
  productFor: z
    .string({ required_error: 'Product category (productFor) is required' })
    .min(1, 'Product category cannot be empty'),
  price: z
    .number({ required_error: 'Price is required' })
    .min(0, 'Price cannot be negative'),
  discount: z
    .number({ required_error: 'Discount is required' })
    .min(0, 'Discount cannot be negative')
    .max(100, 'Discount cannot exceed 100%'),
  productImages: z
    .string({ required_error: 'Product image is required' })
    .url('Product image must be a valid URL')
    .min(1, 'Product image cannot be empty'),
  quantity: z
    .number({ required_error: 'Quantity is required' })
    .min(1, 'Quantity must be at least 1'),
  color: z.string().optional(),
  size: z.string().optional(),
  SKU: z
    .string({ required_error: 'SKU is required' })
    .min(1, 'SKU cannot be empty'),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    userId: z.string(),
    orderItems: z.array(orderItemsValidationSchema),
    subTotal: z.number({
      invalid_type_error: 'Subtotal must be a number.',
    }),
    shippingCharge: z.number({
      invalid_type_error: 'shippingCharge must be a number.',
    }),
    tax: z.number({
      invalid_type_error: 'Tax must be a number.',
    }),
    grandTotal: z.number({
      invalid_type_error: 'grandTotal must be a number.',
    }),
    shippingMethod: z.enum(['standard', 'second Day', 'overnight']),
    shippingAddress: shippingAddressValidationSchema,
    paymentMethod: z.enum(['stripe', 'klarna', 'cod']),
    paymentStatus: z
      .enum(['unpaid', 'paid', 'failed', 'refunded'])
      .default('unpaid'),
    orderStatus: z
      .enum(['processing', 'shipped', 'delivered', 'cancelled', 'returned'])
      .default('processing'),
  }),
});

export const OrderValidation = {
  createOrderValidationSchema,
};
