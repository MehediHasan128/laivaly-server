import { z } from 'zod';
import {
  ProductCategory,
  ProductFor,
  ProductGroup,
  ProductSubCategory,
  Season,
} from './product.constant';

const productDescriptionValiadtionSchema = z.object({
  shortDescription: z
    .string({ required_error: 'Short description is required' })
    .max(200, 'Short description cannot exceed 200 characters'),

  longDescription: z
    .string({ required_error: 'Long description is required' })
    .max(2000, 'Long description cannot exceed 2000 characters'),

  material: z
    .string({ required_error: 'Material is required' })
    .max(100, 'Material cannot exceed 100 characters'),

  careInstructions: z
    .string()
    .max(500, 'Care instructions cannot exceed 500 characters')
    .optional(),

  features: z
    .string()
    .max(500, 'Features cannot exceed 500 characters')
    .optional(),

  productWeight: z
    .number({ invalid_type_error: 'Product weight must be a number' })
    .min(0, 'Product weight cannot be negative')
    .optional(),

  countryOfOrigin: z
    .string()
    .max(100, 'Country of origin cannot exceed 100 characters')
    .optional(),
});

const updateProductDescriptionValiadtionSchema = z.object({
  shortDescription: z
    .string({ required_error: 'Short description is required' })
    .max(200, 'Short description cannot exceed 200 characters')
    .optional(),

  longDescription: z
    .string({ required_error: 'Long description is required' })
    .max(2000, 'Long description cannot exceed 2000 characters')
    .optional(),

  material: z
    .string({ required_error: 'Material is required' })
    .max(100, 'Material cannot exceed 100 characters')
    .optional(),

  careInstructions: z
    .string()
    .max(500, 'Care instructions cannot exceed 500 characters')
    .optional(),

  features: z
    .string()
    .max(500, 'Features cannot exceed 500 characters')
    .optional(),

  productWeight: z
    .number({ invalid_type_error: 'Product weight must be a number' })
    .min(0, 'Product weight cannot be negative')
    .optional(),

  countryOfOrigin: z
    .string()
    .max(100, 'Country of origin cannot exceed 100 characters')
    .optional(),
});

const createProductValidationSchema = z.object({
  body: z.object({
    highlightedProduct: z
      .boolean({
        invalid_type_error: 'Highlighted product must be a boolean',
      })
      .optional()
      .default(false),

    title: z
      .string({
        required_error: 'Product title is required',
        invalid_type_error: 'Product title must be a string',
      })
      .max(200, 'Product title cannot exceed 200 characters'),

    description: productDescriptionValiadtionSchema,

    season: z
      .enum([...Season] as [string, ...string[]], {
        invalid_type_error:
          'Season must be one of Summer, Winter, Spring, Autumn, All-season',
      })
      .optional(),

    productFor: z.enum([...ProductFor] as [string, ...string[]], {
      invalid_type_error: 'Product gender must be Men, Women, or Kids',
    }),

    productGroup: z.enum([...ProductGroup] as [string, ...string[]], {
      required_error: 'Product group is required',
      invalid_type_error:
        'Product group must be one of cloth, accessories, footwear, or fragrance',
    }),

    productCategory: z.enum([...ProductCategory] as [string, ...string[]], {
      required_error: 'Product category is required',
      invalid_type_error: 'Product category must be string',
    }),

    productSubCategory: z.enum(
      [...ProductSubCategory] as [string, ...string[]],
      {
        required_error: 'Product sub category is required',
        invalid_type_error: 'Product sub category must be string',
      },
    ),
    price: z
      .number({
        required_error: 'Product price is required',
        invalid_type_error: 'Product price must be a number',
      })
      .min(0, 'Price cannot be negative'),

    discount: z
      .number({
        invalid_type_error: 'Discount must be a number',
      })
      .min(0, 'Discount cannot be negative')
      .optional()
      .default(0),

    perUnitCost: z
      .number({
        required_error: 'Per unit cost is required',
        invalid_type_error: 'Per unit cost must be a number',
      })
      .min(0, 'Per unit cost cannot be negative'),
    isDeleted: z
      .boolean({
        invalid_type_error: 'isDeleted must be a boolean',
      })
      .optional()
      .default(false),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    highlightedProduct: z
      .boolean({
        invalid_type_error: 'Highlighted product must be a boolean',
      })
      .optional()
      .default(false),

    title: z
      .string({
        required_error: 'Product title is required',
        invalid_type_error: 'Product title must be a string',
      })
      .max(200, 'Product title cannot exceed 200 characters')
      .optional(),

    description: updateProductDescriptionValiadtionSchema,

    season: z
      .enum([...Season] as [string, ...string[]], {
        invalid_type_error:
          'Season must be one of Summer, Winter, Spring, Autumn, All-season',
      })
      .optional(),

    productFor: z
      .enum([...ProductFor] as [string, ...string[]], {
        invalid_type_error: 'Product gender must be Men, Women, or Kids',
      })
      .optional(),

    productGroup: z
      .enum([...ProductGroup] as [string, ...string[]], {
        required_error: 'Product group is required',
        invalid_type_error:
          'Product group must be one of cloth, accessories, footwear, or fragrance',
      })
      .optional(),

    productCategory: z
      .enum([...ProductCategory] as [string, ...string[]], {
        required_error: 'Product category is required',
        invalid_type_error: 'Product category must be string',
      })
      .optional(),

    productSubCategory: z
      .enum([...ProductSubCategory] as [string, ...string[]], {
        required_error: 'Product sub category is required',
        invalid_type_error: 'Product sub category must be string',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Product price is required',
        invalid_type_error: 'Product price must be a number',
      })
      .min(0, 'Price cannot be negative')
      .optional(),

    discount: z
      .number({
        invalid_type_error: 'Discount must be a number',
      })
      .min(0, 'Discount cannot be negative')
      .optional()
      .default(0),

    perUnitCost: z
      .number({
        required_error: 'Per unit cost is required',
        invalid_type_error: 'Per unit cost must be a number',
      })
      .min(0, 'Per unit cost cannot be negative')
      .optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
