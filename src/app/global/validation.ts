import { z } from 'zod';

export const UserNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be a string',
    })
    .min(1, { message: 'First name cannot be empty' })
    .trim(),

  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name must be a string',
    })
    .min(1, { message: 'Last name cannot be empty' })
    .trim(),
});

export const ShippingAddressValidation = z.object({
  body: z.object({
    addressCategory: z.string(),
    recipientsName: z
      .string()
      .min(1, { message: "Recipient's name is required." })
      .trim(),

    phoneNumber: z
      .string()
      .min(7, { message: 'Phone number must be at least 7 digits.' })
      .max(15, { message: 'Phone number must not exceed 15 digits.' })
      .regex(/^\+?\d{7,15}$/, {
        message:
          'Phone number is invalid. It should contain only digits and may start with a +.',
      }),

    address: z.string().min(1, { message: 'Address is required.' }).trim(),

    city: z.string().min(1, { message: 'City is required.' }).trim(),

    postalCode: z
      .string()
      .min(1, { message: 'Postal code is required.' })
      .trim(),

    state: z.string().min(1, { message: 'State is required.' }).trim(),

    country: z.string().min(1, { message: 'Country is required.' }).trim(),
  }),
});

export const updateShippingAddressValidation = z.object({
  body: z.object({
    addressCategory: z.string().optional(),
    recipientsName: z
      .string()
      .min(1, { message: "Recipient's name is required." })
      .trim().optional(),

    phoneNumber: z
      .string()
      .min(7, { message: 'Phone number must be at least 7 digits.' })
      .max(15, { message: 'Phone number must not exceed 15 digits.' })
      .regex(/^\+?\d{7,15}$/, {
        message:
          'Phone number is invalid. It should contain only digits and may start with a +.',
      }).optional(),

    address: z.string().min(1, { message: 'Address is required.' }).trim().optional(),

    city: z.string().min(1, { message: 'City is required.' }).trim().optional(),

    postalCode: z
      .string()
      .min(1, { message: 'Postal code is required.' })
      .trim().optional(),

    state: z.string().min(1, { message: 'State is required.' }).trim().optional(),

    country: z.string().min(1, { message: 'Country is required.' }).trim().optional(),
  }),
});
