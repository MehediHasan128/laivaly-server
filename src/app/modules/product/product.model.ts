import { model, Schema } from 'mongoose';
import { TProduct, TVariant } from './product.interface';
import {
  ProductCategory,
  ProductGroup,
  ProductSubCategory,
  TargetedAudiance,
} from './product.constant';

const variantSchema = new Schema<TVariant>({
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

const productSchema = new Schema<TProduct>({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
  },
  group: {
    type: String,
    enum: {
      values: ProductGroup,
      message: 'Group must be either Men, Women, or Kids',
    },
    required: [true, 'Product group is required'],
  },
  category: {
    type: String,
    enum: {
      values: ProductCategory,
      message: 'Category must be Clothing, Footwear, or Accessories',
    },
    required: [true, 'Product category is required'],
  },
  subCategory: {
    type: String,
    enum: {
      values: ProductSubCategory,
      message: 'Invalid sub-category',
    },
    required: [true, 'Product sub-category is required'],
  },
  targetedAudiance: {
    type: String,
    enum: {
      values: TargetedAudiance,
      message: 'Invalid audience',
    },
    required: [true, 'Product target audience is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be non-negative'],
  },
  discountPrice: {
    type: Number,
    required: [true, 'Discount price is required'],
    min: [0, 'Discount price must be non-negative'],
    default: 0,
  },
  variants: {
    type: [variantSchema],
    required: false,
  },
  productThumbnail: {
    type: String,
    required: [true, 'Product thumbnail is required'],
  },
  productImages: {
    type: [String],
    required: [true, 'At least one product image is required'],
    validate: {
      validator: (v: string[]) => Array.isArray(v) && v.length > 0,
      message: 'Product must have at least one image',
    },
  },
  productWeight: {
    type: String,
    required: false,
  },
}, {
  timestamps: true
});

export const Product = model<TProduct>('product', productSchema);
