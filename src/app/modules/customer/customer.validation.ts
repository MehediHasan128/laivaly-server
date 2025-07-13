import { z } from 'zod';
import { userNameValidationSchema } from '../../global/validation';

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
      userEmail: z.string().email('Please enter a valid email address'),
    }),
  }),
});

export const customerValidation = {
  createCustomerValidationSchema,
};
