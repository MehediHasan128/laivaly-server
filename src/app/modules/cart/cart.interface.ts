import { Types } from "mongoose";

export interface TCartItem {
    productId: Types.ObjectId;
    quantity: number;
    selectedVariant: {
        color?: string;
        size?: string;
        SKU: string;
    };
    _id: string;
}

export interface TCart {
    userId: Types.ObjectId;
    items: TCartItem[] | [];
}