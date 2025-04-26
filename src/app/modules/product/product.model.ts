import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';
import { ProductAudience, ProductCategory, ProductGroup, ProductSubCategory } from './product.constant';

const ProductSchema = new Schema<TProduct>({
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
  targetAudience: {
    type: String,
    enum: {
      values: ProductAudience,
      message: 'Invalid audience'
    },
    required: [true, 'Product target audience is required'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  discount: {
    type: Number,
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%'],
    default: 0
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required'],
  },
  inStock: {
    type: Boolean,
    required: [true, 'Stock status is required'],
    default: true
  },
  color: {
    type: [String],
    required: [true, 'At least one color is required'],
  },
  sizes: {
    type: [String],
    required: [true, 'At least one size is required'],
  },
  images: {
    type: [String],
    required: [true, 'At least one image URL is required'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Thumbnail image is required'],
  },
  SKU: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
  },
  weight: {
    type: String,
    required: [true, 'Weight is required'],
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});



export const Product = model<TProduct>('product', ProductSchema);
