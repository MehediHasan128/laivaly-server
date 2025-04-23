import { TProductCategory, TProductGroup, TProductSubCategory } from "./product.constant";

export type TProduct = {
    title: string;
    description: string;
    group: TProductGroup;
    category: TProductCategory;
    subCategory: TProductSubCategory;
    price: number;
    discount: number;
    quantity: number;
    inStock: boolean;
    color: string[];
    sizes: string[];
    images: string[];
    thumbnail: string;
    SKU: string;
    weight: string;
}