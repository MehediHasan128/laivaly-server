import { model, Schema } from 'mongoose';
import { TCart, TCartItem } from './cart.interface';

const selectedVariantSchema = new Schema<{
  size?: string;
  SKU: string;
}>({
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
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required!'],
  },
  selectedVariant: selectedVariantSchema,
  totalPrice: {
    type: Number,
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
    default: []
  }
});

export const Cart = model<TCart>('cart', cartSchema);
