import { Types } from 'mongoose';

export interface TProductSizes {
  size?: string;
  stock: number;
  SKU: string;
}

export interface TVariants {
  color?: string;
  images: string[];
  sizes: TProductSizes[];
}

export interface TProductVariant {
  productId: Types.ObjectId;
  variants: TVariants[] | [];
}
