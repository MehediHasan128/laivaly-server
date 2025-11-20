import { z } from 'zod';

const productSizesValiadtionSchema = z.object({
  size: z.string().trim().optional(),
  stock: z
    .number({
      required_error: 'Stock is required',
      invalid_type_error: 'Stock must be a number',
    })
    .min(0, 'Stock cannot be negative'),
});

const VariantsValiadtionSchema = z.object({
  color: z.string().trim().optional(),
  images: z
    .array(z.string().trim(), {
      required_error: 'Images are required',
    })
    .min(1, 'At least one image is required'),
  sizes: z
    .array(productSizesValiadtionSchema, {
      required_error: 'Sizes are required',
    })
    .min(1, 'At least one size is required'),
});

const createProductVariantValidationSchema = z.object({
  body: z.object({
    variants: z.array(VariantsValiadtionSchema).default([]),
  }),
});

export const ProductVariantValidation = {
  createProductVariantValidationSchema,
};
