import { Types } from "mongoose";

export interface TProductWishlist {
    userId: Types.ObjectId;
    productId: Types.ObjectId[] | [];
}