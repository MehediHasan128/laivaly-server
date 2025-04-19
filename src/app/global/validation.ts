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
  street: z
    .string({
      required_error: 'Street is required',
      invalid_type_error: 'Street must be a string',
    })
    .min(1, { message: 'Street cannot be empty' }),

  city: z
    .string({
      required_error: 'City is required',
      invalid_type_error: 'City must be a string',
    })
    .min(1, { message: 'City cannot be empty' }),

  state: z
    .string({
      required_error: 'State is required',
      invalid_type_error: 'State must be a string',
    })
    .min(1, { message: 'State cannot be empty' }),

  postalCode: z
    .string({
      required_error: 'Postalcode is required',
      invalid_type_error: 'Postalcode must be a string',
    })
    .min(1, { message: 'Postalcode cannot be empty' }),

  country: z
    .string({
      required_error: 'Country is required',
      invalid_type_error: 'Country must be a string',
    })
    .min(1, { message: 'Country cannot be empty' }),
});
