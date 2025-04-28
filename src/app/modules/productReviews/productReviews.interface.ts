import { Types } from "mongoose";

export type TRating = {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
};

export type TReviews = {
    customerId: Types.ObjectId | null;
    rating: number | null;
    comment: string | null;
};

export type TProductReviews = {
    productId: Types.ObjectId;
    ratings: TRating;
    overAllRating: number;
    reviews?: TReviews[];
};

