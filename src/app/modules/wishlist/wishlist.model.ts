import { model, Schema } from 'mongoose';
import { TProductWishlist } from './wishlist.interface';

const wishlistSchema = new Schema<TProductWishlist>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required for wishlist.'],
      unique: true,
      ref: 'User',
    },
    productId: [
      {
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'product',
      },
    ],
  }
);

export const Wishlist = model<TProductWishlist>('wishlist', wishlistSchema);
