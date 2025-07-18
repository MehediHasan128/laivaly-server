import { z } from 'zod';
import {
  ProductCategory,
  ProductFor,
  ProductGroup,
  ProductSubCategory,
  TargetedAudiance,
} from './product.constant';

const variantValidationSchema = z.object({
  size: z.string().optional(),
  color: z.string().optional(),
  stock: z
    .number({
      required_error: 'Stock is required',
      invalid_type_error: 'Stock must be a number',
    })
    .min(0, 'Stock cannot be negative'),
  SKU: z.string({
    required_error: 'SKU is required',
  }),
});

const createProductValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Product title is required',
    }),
    description: z.string({
      required_error: 'Product description is required',
    }),
    group: z.enum([...ProductGroup] as [string, ...string[]], {
      required_error: 'Product group is required',
      invalid_type_error: 'Group must be either Men, Women, or Kids',
    }),
    category: z.enum([...ProductCategory] as [string, ...string[]], {
      required_error: 'Product category is required',
      invalid_type_error: 'Category must be Clothing, Footwear, or Accessories',
    }),
    subCategory: z.enum([...ProductSubCategory] as [string, ...string[]], {
      required_error: 'Product sub-category is required',
      invalid_type_error: 'Invalid sub-category',
    }),
    productFor: z.enum([...ProductFor] as [string, ...string[]], {
      required_error: 'Product for is required',
      invalid_type_error: 'Invalid value',
    }),
    targetedAudiance: z.enum([...TargetedAudiance] as [string, ...string[]], {
      required_error: 'Product target audience is required',
      invalid_type_error: 'Invalid audience',
    }),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .min(0, 'Price must be non-negative'),
    discountPrice: z
      .number({
        required_error: 'Discount price is required',
      })
      .min(0, 'Discount price must be non-negative')
      .default(0),
    variants: z.array(variantValidationSchema).optional(),
    productThumbnail: z.string({
      required_error: 'Product thumbnail is required',
    }),
    productImages: z
      .array(
        z.string({
          required_error: 'Product image is required',
        }),
      )
      .min(1, 'Product must have at least one image'),
    productWeight: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const ProductValidation = { createProductValidationSchema };
