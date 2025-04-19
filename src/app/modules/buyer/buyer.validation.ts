import { z } from 'zod';
import {
  ShippingAddressValidation,
  UserNameValidationSchema,
} from '../../global/validation';

const createBuyerValidationSchema = z.object({
  userName: UserNameValidationSchema,

  userEmail: z
    .string({
      required_error: 'Email address is required',
      invalid_type_error: 'Email address must be a string',
    })
    .email('Please provide a valid email address')
    .trim()
    .toLowerCase(),

  profileImage: z.string().optional().default(''),

  dateOfBirth: z
    .string({
      required_error: 'Date of birth is required',
    })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    }),

  gender: z.enum(['male', 'female'], {
    required_error: 'Gender is required',
    invalid_type_error: 'Gender must be either male or female',
  }),

  phoneNumber: z
    .string({
      required_error: 'Phone number is required',
    })
    .regex(/^\+?[1-9]\d{1,14}$/, 'Phone number is invalid'),

  shippingAddress: z
    .array(ShippingAddressValidation)
    .min(1, 'At least one shipping address is required'),
});

export const BuyerValidation = {
  createBuyerValidationSchema,
};
