import { Types } from 'mongoose';
import {
  TProductCategory,
  TProductFor,
  TProductGroup,
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
  highlightedProduct: boolean;
  parentProductId: string;
  title: string;
  description: TProductDescription;
  season?: TSeason;
  productFor: TProductFor;
  productGroup: TProductGroup;
  productCategory: TProductCategory;
  productSubCategory: TProductSubCategory;
  productVeriants: Types.ObjectId | null;
  price: number;
  discount: number;
  perUnitCost: number;
  productThumbnail: string;
  productImages: string[];
  productReviews: Types.ObjectId | null;
  isDeleted: boolean;
}
