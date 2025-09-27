import { Types } from "mongoose";
import { TProductFor } from "../product/product.constant";

export interface TCartItem {
    _id: string;
    productId: Types.ObjectId;
    productTitle: string;
    productThumbnail: string;
    quantity: number;
    selectedVariant: {
        color?: string;
        size?: string;
        SKU: string;
    };
    totalPrice: number;
    disscountRate: number;
    productFor: TProductFor;
}

export interface TCart {
    userId: Types.ObjectId;
    items: TCartItem[] | [];
}