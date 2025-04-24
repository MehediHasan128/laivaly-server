import { z } from 'zod';
import {
  ProductCategory,
  ProductGroup,
  ProductSubCategory,
} from './product.constant';

const CreateProductValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: 'Product title is required' }),
    description: z
      .string()
      .min(1, { message: 'Product description is required' }),
    group: z.enum([...ProductGroup] as [string, ...string[]]),
    category: z.enum([...ProductCategory] as [string, ...string[]]),
    subCategory: z.enum([...ProductSubCategory] as [string, ...string[]]),
    price: z
      .number({
        required_error: 'Product price is required',
        invalid_type_error: 'Price must be a number',
      })
      .min(0, { message: 'Price cannot be negative' }),
    discount: z
      .number()
      .min(0, { message: 'Discount cannot be negative' })
      .max(100, { message: 'Discount cannot exceed 100%' })
      .default(0),
    quantity: z
      .number()
      .int({ message: 'Quantity must be an integer' })
      .min(0, { message: 'Quantity cannot be negative' }),
    inStock: z
      .boolean({ required_error: 'Stock status is required' })
      .default(true),
    color: z
      .array(z.string().min(1))
      .min(1, { message: 'At least one color is required' }),
    sizes: z
      .array(z.string().min(1))
      .min(1, { message: 'At least one size is required' }),
    SKU: z.string().min(1, { message: 'SKU is required' }),
    weight: z.string().min(1, { message: 'Weight is required' }),
  }),
});

export const ProductValidation = {
  CreateProductValidationSchema,
};
