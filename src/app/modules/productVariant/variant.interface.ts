import { Types } from "mongoose";

export interface TVariants {
    size?: string;
    color?: string;
    stock: number;
    SKU: string;
}

export interface TProductVariant {
    productId: Types.ObjectId,
    variants: TVariants[] | []
}