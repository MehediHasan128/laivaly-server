import { z } from 'zod';

const userValidationSchema = z.object({
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
    )
});


export const userValidation = {
    userValidationSchema
}
