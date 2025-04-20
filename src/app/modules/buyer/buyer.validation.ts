import { z } from 'zod';
import {
  ShippingAddressValidation,
  UserNameValidationSchema,
} from '../../global/validation';

const createBuyerValidationSchema = z.object({
  body: z.object({
    userName: UserNameValidationSchema,

    userEmail: z
      .string({
        required_error: 'Email address is required',
        invalid_type_error: 'Email address must be a string',
      })
      .email('Please provide a valid email address')
      .trim()
      .toLowerCase(),

    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
      }),

    profileImage: z.string().optional().default(''),

    dateOfBirth: z
      .string({
        required_error: 'Date of birth is required',
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .optional(),

    gender: z
      .enum(['male', 'female'], {
        required_error: 'Gender is required',
        invalid_type_error: 'Gender must be either male or female',
      })
      .optional(),

    phoneNumber: z
      .string({
        required_error: 'Phone number is required',
      })
      .regex(/^\+?[1-9]\d{1,14}$/, 'Phone number is invalid')
      .optional(),

    shippingAddress: z
      .array(ShippingAddressValidation)
      .min(1, 'At least one shipping address is required')
      .optional(),
  }),
});

const updateBuyerValidationSchema = z.object({
  body: z.object({
    userName: UserNameValidationSchema.optional(),

    userEmail: z
      .string({
        required_error: 'Email address is required',
        invalid_type_error: 'Email address must be a string',
      })
      .email('Please provide a valid email address')
      .trim()
      .toLowerCase()
      .optional(),

    profileImage: z.string().optional().default(''),

    dateOfBirth: z
      .string({
        required_error: 'Date of birth is required',
      })
      .refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format',
      })
      .optional(),

    gender: z
      .enum(['male', 'female'], {
        required_error: 'Gender is required',
        invalid_type_error: 'Gender must be either male or female',
      })
      .optional(),

    phoneNumber: z
      .string({
        required_error: 'Phone number is required',
      })
      .regex(/^\+?[1-9]\d{1,14}$/, 'Phone number is invalid')
      .optional(),

    shippingAddress: z
      .array(ShippingAddressValidation)
      .min(1, 'At least one shipping address is required')
      .optional(),
  }),
});

export const BuyerValidation = {
  createBuyerValidationSchema,
  updateBuyerValidationSchema
};
