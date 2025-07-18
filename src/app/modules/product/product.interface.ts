import { TProductCategory, TProductGroup, TProductSubCategory, TTargetedAudiance } from "./product.constant";

export interface TVariant {
    size?: string;
    stock: number;
    SKU: string;
    color?: string;
};

export interface TProduct {
    title: string;
    description: string;
    group: TProductGroup;
    category: TProductCategory;
    subCategory: TProductSubCategory;
    targetedAudiance: TTargetedAudiance;
    price: number;
    discountPrice: number;
    variants?: TVariant[];
    productThumbnail: string;
    productImages: string[];
    productWeight?: string;
};