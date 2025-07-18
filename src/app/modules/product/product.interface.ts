import { TProductCategory, TProductFor, TProductGroup, TProductSubCategory, TTargetedAudiance } from "./product.constant";

export interface TVariant {
    size?: string;
    stock: number;
    SKU: string;
};

export interface TProduct {
    productId: string;
    title: string;
    description: string;
    group: TProductGroup;
    category: TProductCategory;
    subCategory: TProductSubCategory;
    productFor: TProductFor;
    targetedAudiance: TTargetedAudiance;
    price: number;
    discountPrice: number;
    variants?: TVariant[];
    color?: string[];
    productThumbnail: string;
    productImages: string[];
    productWeight?: string;
    isDeleted: boolean;
};