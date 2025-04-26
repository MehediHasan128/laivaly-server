import { model, Schema } from "mongoose";
import { TProductReviews, TRating, TReviews } from "./productReviews.interface";

const RatingSchema = new Schema<TRating>({
    fiveStar: {type: Number},
    fourStar: {type: Number},
    threeStar: {type: Number},
    twoStar: {type: Number},
    oneStar: {type: Number}
});

const ReviewsSchema = new Schema<TReviews>({
    customerId: {type: Schema.Types.ObjectId, ref: 'User', default: null},
    comment: {type: String, default: null}
});

const ProductReviewSchema = new Schema<TProductReviews>({
    productId: {type: Schema.Types.ObjectId, ref: 'product'},
    ratings: RatingSchema,
    reviews: [ReviewsSchema]
});

export const Review = model<TProductReviews>('review', ProductReviewSchema);