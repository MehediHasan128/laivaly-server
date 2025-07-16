import { z } from 'zod';

export const userNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name must be at most 50 characters' })
    .trim(),

  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name must be at most 50 characters' })
    .trim(),
});

export const userNameUpdateValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .min(2, { message: 'First name must be at least 2 characters' })
    .max(50, { message: 'First name must be at most 50 characters' })
    .trim().optional(),

  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(2, { message: 'Last name must be at least 2 characters' })
    .max(50, { message: 'Last name must be at most 50 characters' })
    .trim().optional(),
});

export const shippingAddressValidationSchema = z.object({
  addressCategory: z
    .string({
      required_error: 'Address category is required',
    })
    .min(1, 'Address category cannot be empty'),

  recipientsName: z
    .string({
      required_error: "Recipient's name is required",
    })
    .min(2, "Recipient's name must be at least 2 characters"),

  phoneNumber: z
    .string({
      required_error: 'Phone number is required',
    })
    .regex(/^\+?[0-9]{10,15}$/, 'Phone number must be valid'),

  address: z
    .string({
      required_error: 'Address is required',
    })
    .min(1, 'Address cannot be empty'),

  city: z
    .string({
      required_error: 'City is required',
    })
    .min(1, 'City cannot be empty'),

  postalCode: z
    .string({
      required_error: 'Postal code is required',
    })
    .regex(/^\d{4,10}$/, 'Postal code must be 4 to 10 digits'),

  state: z
    .string({
      required_error: 'State is required',
    })
    .min(1, 'State cannot be empty'),

  country: z
    .string({
      required_error: 'Country is required',
    })
    .min(1, 'Country cannot be empty'),
});

export const updateShippingAddressValidationSchema = z.object({
  addressCategory: z
    .string({
      required_error: 'Address category is required',
    })
    .min(1, 'Address category cannot be empty').optional(),

  recipientsName: z
    .string({
      required_error: "Recipient's name is required",
    })
    .min(2, "Recipient's name must be at least 2 characters").optional(),

  phoneNumber: z
    .string({
      required_error: 'Phone number is required',
    })
    .regex(/^\+?[0-9]{10,15}$/, 'Phone number must be valid').optional(),

  address: z
    .string({
      required_error: 'Address is required',
    })
    .min(1, 'Address cannot be empty').optional(),

  city: z
    .string({
      required_error: 'City is required',
    })
    .min(1, 'City cannot be empty').optional(),

  postalCode: z
    .string({
      required_error: 'Postal code is required',
    })
    .regex(/^\d{4,10}$/, 'Postal code must be 4 to 10 digits').optional(),

  state: z
    .string({
      required_error: 'State is required',
    })
    .min(1, 'State cannot be empty').optional(),

  country: z
    .string({
      required_error: 'Country is required',
    })
    .min(1, 'Country cannot be empty').optional(),
});
