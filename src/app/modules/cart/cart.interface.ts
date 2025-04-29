import { Types } from "mongoose"

export type TCartItem = {
    productId: Types.ObjectId,
    color?: string;
    size?: string;
    quantity: number;
};

export type TCart = {
    userId: Types.ObjectId;
    items: [TCartItem];
};