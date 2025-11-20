import { model, Schema } from 'mongoose';
import { TProductSizes, TProductVariant, TVariants } from './variant.interface';

const productSizeSchema = new Schema<TProductSizes>({
  size: {
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
  },
});

const variantSchema = new Schema<TVariants>({
  color: {
    type: String,
    required: false,
    trim: true,
  },
  images: {
    type: [String],
    required: true,
  },
  sizes: {
    type: [productSizeSchema],
    required: true,
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

export const Variant = model<TProductVariant>('variant', productVariantSchema);
