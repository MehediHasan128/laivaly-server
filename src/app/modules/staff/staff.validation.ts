import { z } from 'zod';
import { userNameUpdateValidationSchema } from '../../global/validation';

const createStaffValidationSchema = z.object({
  body: z.object({
    userName: userNameUpdateValidationSchema,
    userEmail: z
      .string({
        required_error: 'User email is required',
      })
      .trim()
      .toLowerCase()
      .email('Please enter a valid email address'),
    dateOfBirth: z.string({ required_error: 'Date of birth is required' }),
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    stafCategory: z.enum(['men', 'women', 'children']).nullable(),
  }),
});

export const StaffValidation = {
  createStaffValidationSchema,
};
