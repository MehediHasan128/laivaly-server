import { Types } from 'mongoose';

export interface TSelectedVariant {
  color?: string;
  size?: string;
  SKU: string;
  productImage: string;
}

export interface TCartItem {
  _id: string;
  productId: Types.ObjectId;
  quantity: number;
  selectedVariant: TSelectedVariant;
}

export interface TCart {
  userId: Types.ObjectId;
  items: TCartItem[] | [];
}
