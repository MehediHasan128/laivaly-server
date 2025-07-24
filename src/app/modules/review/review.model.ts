import { model, Schema } from 'mongoose';
import { Review as reviewContent, TReviews } from './review.interface';

const reviewSchema = new Schema<reviewContent>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required for each review.'],
    ref: 'User',
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1.'],
    max: [5, 'Rating cannot exceed 5.'],
  },
  comment: {
    type: String,
    trim: true,
  },
  picture: {
    type: [String],
    validate: {
      validator: (arr: string[]) => arr.every((url) => typeof url === 'string'),
      message: 'All picture URLs must be strings',
    },
  },
});

const createReviewSchema = new Schema<TReviews>({
  reviews: {
    type: [reviewSchema],
    default: [],
  },
});

export const Review = model<TReviews>('review', createReviewSchema);
