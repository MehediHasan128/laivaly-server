import mongoose from 'mongoose';
import { z } from 'zod';

const addReviewValidationSchema = z.object({
  body: z.object({
    userId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid user ID.',
    }),
    rating: z
      .number()
      .min(1, { message: 'Rating must be at least 1.' })
      .max(5, { message: 'Rating cannot exceed 5.' })
      .optional(),
    comment: z
      .string()
      .trim()
      .max(1000, { message: 'Comment cannot exceed 1000 characters.' })
      .optional(),
  }),
});

export const ReviewValidation = { addReviewValidationSchema };
