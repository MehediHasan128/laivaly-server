import { z } from 'zod';

const userSignInValidationSchema = z.object({
  body: z.object({
    userEmail: z.string(),
    password: z.string(),
  }),
});

const changlePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
      }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    userEmail: z
      .string({
        required_error: 'Email address is required',
        invalid_type_error: 'Email address must be a string',
      })
      .email('Please provide a valid email address')
      .trim()
      .toLowerCase(),
  }),
});

const resetPasswordValidationSchema = z.object({
  body: z.object({
    userEmail: z.string(),
    password: z.string(),
  }),
});

export const AuthValidation = {
  userSignInValidationSchema,
  changlePasswordValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema
};
