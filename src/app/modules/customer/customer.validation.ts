import { z } from 'zod';
import {
  userNameUpdateValidationSchema,
  userNameValidationSchema,
} from '../../global/validation';

const createCustomerValidationSchema = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8, 'Password must be at least 8 characters long')
      .refine(
        (val) => /[A-Z]/.test(val),
        'Password must contain at least one uppercase letter',
      )
      .refine(
        (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
        'Password must contain at least one special character',
      ),
    customer: z.object({
      userName: userNameValidationSchema,
      userEmail: z
        .string({
          required_error: 'User email is required',
        })
        .trim()
        .toLowerCase()
        .email('Please enter a valid email address'),
    }),
  }),
});

const updateCustomerProfileValidationSchema = z.object({
  body: z.object({
    userName: userNameUpdateValidationSchema.optional(),
    dateOfBirth: z.string().optional(),
    phoneNumber: z.string().optional(),
    gender: z.enum(['male', 'female']).nullable().optional(),
  }),
});

export const customerValidation = {
  createCustomerValidationSchema,
  updateCustomerProfileValidationSchema,
};
