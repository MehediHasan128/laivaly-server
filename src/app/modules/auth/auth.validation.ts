import { z } from 'zod';

const userLoginValidationSchema = z.object({
  body: z.object({
    userEmail: z.string({ required_error: 'User email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const forgetUserPasswordValidationSchema = z.object({
  body: z.object({
    userEmail: z.string({ required_error: 'User email is required' }),
  }),
});

const resetUserPasswordValidationSchema = z.object({
  body: z.object({
    userEmail: z.string({ required_error: 'User email is required' }),
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
  }),
});

export const AuthValidation = {
  userLoginValidationSchema,
  forgetUserPasswordValidationSchema,
  resetUserPasswordValidationSchema,
};
