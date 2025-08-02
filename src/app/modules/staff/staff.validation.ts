import { z } from 'zod';
import { userNameUpdateValidationSchema } from '../../global/validation';

const staffAddressValidationSchema = z.object({
  houseNumber: z
    .string({ required_error: 'House number is required' })
    .trim()
    .min(1, 'House number is required'),
  address: z
    .string({ required_error: 'Street address is required' })
    .trim()
    .min(1, 'Street address is required'),
  city: z
    .string({ required_error: 'City is required' })
    .trim()
    .min(1, 'City is required'),
  postalCode: z
    .string({ required_error: 'Postal code is required' })
    .trim()
    .min(1, 'Postal code is required'),
  state: z
    .string({ required_error: 'State is required' })
    .trim()
    .min(1, 'State is required'),
  country: z
    .string({ required_error: 'Country is required' })
    .trim()
    .min(1, 'Country is required'),
});

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
    presentAddress: staffAddressValidationSchema,
    permanentAddress: staffAddressValidationSchema,
  }),
});

export const StaffValidation = {
  createStaffValidationSchema,
};
