import { model, Schema } from 'mongoose';
import { TProductVariant, TVariants } from './variant.interface';

const variantSchema = new Schema<TVariants>({
  size: {
    type: String,
    required: false,
    trim: true,
  },
  color: {
    type: String,
    required: false,
    trim: true,
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative'],
  },
  SKU: {
    type: String,
    required: [true, 'SKU is required'],
    trim: true,
    unique: true,
  },
});

const productVariantSchema = new Schema<TProductVariant>({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'product',
  },
  variants: {
    type: [variantSchema],
    default: [],
  },
});


export const Variant = model<TProductVariant>('variant', productVariantSchema)