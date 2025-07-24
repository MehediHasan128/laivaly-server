import { Types } from "mongoose";

export interface Review {
    userId: Types.ObjectId;
    rating?: number;
    comment?: string;
    picture?: string[];
}

export interface TReviews {
    reviews: Review[] | [];
}