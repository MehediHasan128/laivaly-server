import { Types } from "mongoose";

export interface TItem {
    productId: Types.ObjectId;
    quantity: number;
    selectedVariant: {
        size: string;
        SKU: string;
    };
    totalPrice: number;
}

export interface TCart {
    userId: Types.ObjectId;
    items: TItem[];
}