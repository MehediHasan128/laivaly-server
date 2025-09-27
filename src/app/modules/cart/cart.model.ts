import { model, Schema } from 'mongoose';
import { TCart, TCartItem } from './cart.interface';
import { ProductFor } from '../product/product.constant';

export const selectedVariantSchema = new Schema<{
  color?: string;
  size?: string;
  SKU: string;
}>({
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  SKU: {
    type: String,
    required: [true, 'Product SKU is required!'],
  },
});

const cartItemSchema = new Schema<TCartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Product ID is required!'],
    ref: 'product',
  },
  productTitle: {
    type: String,
    required: [true, 'Product title is required!'],
  },
  productThumbnail: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required!'],
  },
  selectedVariant: selectedVariantSchema,
  totalPrice: {
    type: Number,
  },
  disscountRate: {
    type: Number,
  },
  productFor: {
    type: String,
    enum: ProductFor,
    required: [true, 'Product gender is required'],
  },
});

const cartSchema = new Schema<TCart>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required!'],
    ref: 'User',
  },
  items: {
    type: [cartItemSchema],
    default: [],
  },
});

export const Cart = model<TCart>('cart', cartSchema);
