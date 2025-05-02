import { model, Schema } from 'mongoose';
import { TCart, TCartItem } from './cart.interface';

const CartItemSchema = new Schema<TCartItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product ID is required in cart item.'],
      ref: 'product',
    },
    color: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required in cart item.'],
      min: [1, 'Quantity must be at least 1.'],
    }
  }
);

const CartSchema = new Schema<TCart>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required for the cart.'],
    ref: 'User',
  },
  items: {
    type: [CartItemSchema],
    required: [true, 'Cart must contain at least one item.'],
    validate: {
      validator: (items: TCartItem[]) => items.length > 0,
      message: 'Cart must have at least one item.',
    },
  },
});

export const Cart = model<TCart>('cart', CartSchema);
