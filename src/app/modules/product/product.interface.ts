import { Types } from 'mongoose';
import {
  TProductCategory,
  TProductFor,
  TProductGroup,
  TProductLayout,
  TProductSubCategory,
  TSeason,
} from './product.constant';

export interface TProductDescription {
  shortDescription: string;
  longDescription: string;
  material: string;
  careInstructions?: string;
  features?: string;
  productWeight?: number;
  countryOfOrigin?: string;
}

export interface TProduct {
  productLayout: TProductLayout;
  parentProductId: string;
  title: string; 
  description: TProductDescription; 
  season?: TSeason;
  productFor: TProductFor;
  group: TProductGroup;
  category: TProductCategory;
  subCategory: TProductSubCategory;
  style: TProductSubCategory;
  productVariants: Types.ObjectId | null;
  price: number;
  discount: number;
  perUnitCost: number;
  productThumbnail: string;
  status: 'active' | 'draft' | 'coming-soon' | 'discontinued';
  launchDate?: Date;
  productReviews: Types.ObjectId | null;
  isDeleted: boolean;
}
