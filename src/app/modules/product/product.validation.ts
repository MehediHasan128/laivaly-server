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
    discount: z
      .number({
        required_error: 'Discount price is required',
      })
      .min(0, 'Discount price must be non-negative')
      .default(0),
    variants: z.array(variantValidationSchema).optional(),
    color: z.array(z.string()).optional(),
    productWeight: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Product title is required',
    }).optional(),
    description: z.string({
      required_error: 'Product description is required',
    }).optional(),
    group: z.enum([...ProductGroup] as [string, ...string[]], {
      required_error: 'Product group is required',
      invalid_type_error: 'Group must be either Men, Women, or Kids',
    }).optional(),
    category: z.enum([...ProductCategory] as [string, ...string[]], {
      required_error: 'Product category is required',
      invalid_type_error: 'Category must be Clothing, Footwear, or Accessories',
    }).optional(),
    subCategory: z.enum([...ProductSubCategory] as [string, ...string[]], {
      required_error: 'Product sub-category is required',
      invalid_type_error: 'Invalid sub-category',
    }).optional(),
    productFor: z.enum([...ProductFor] as [string, ...string[]], {
      required_error: 'Product for is required',
      invalid_type_error: 'Invalid value',
    }).optional(),
    targetedAudiance: z.enum([...TargetedAudiance] as [string, ...string[]], {
      required_error: 'Product target audience is required',
      invalid_type_error: 'Invalid audience',
    }).optional(),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .min(0, 'Price must be non-negative').optional(),
    discount: z
      .number({
        required_error: 'Discount price is required',
      })
      .min(0, 'Discount price must be non-negative')
      .default(0).optional(),
    variants: z.array(variantValidationSchema).optional(),
    color: z.array(z.string()).optional(),
    productWeight: z.string().optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
