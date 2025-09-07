import { model, Schema } from 'mongoose';
import { TProduct, TProductDescription } from './product.interface';
import {
  ProductCategory,
  ProductFor,
  ProductGroup,
  ProductSubCategory,
  Season,
} from './product.constant';

const ProductDescriptionSchema = new Schema<TProductDescription>({
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [200, 'Short description cannot exceed 200 characters'],
  },
  longDescription: {
    type: String,
    required: [true, 'Long description is required'],
    trim: true,
    maxlength: [2000, 'Long description cannot exceed 2000 characters'],
  },
  material: {
    type: String,
    required: [true, 'Material is required'],
    trim: true,
    maxlength: [100, 'Material cannot exceed 100 characters'],
  },
  careInstructions: {
    type: String,
    trim: true,
    maxlength: [500, 'Care instructions cannot exceed 500 characters'],
  },
  features: {
    type: String,
    trim: true,
    maxlength: [500, 'Features cannot exceed 500 characters'],
  },
  productWeight: {
    type: Number,
    min: [0, 'Product weight cannot be negative'],
  },
  countryOfOrigin: {
    type: String,
    trim: true,
    maxlength: [100, 'Country of origin cannot exceed 100 characters'],
  },
});

const ProductSchema = new Schema<TProduct>(
  {
    highlightedProduct: {
      type: Boolean,
      default: false,
    },
    parentProductId: {
      type: String,
      required: [true, 'Product ID is required'],
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      maxlength: [200, 'Product title cannot exceed 200 characters'],
    },
    description: {
      type: ProductDescriptionSchema,
      required: [true, 'Product description is required'],
    },
    season: {
      type: String,
      enum: Season,
    },
    productFor: {
      type: String,
      enum: ProductFor,
      required: [true, 'Product gender is required'],
    },
    productGroup: {
      type: String,
      enum: ProductGroup,
      required: [true, 'Product group is required'],
    },
    productCategory: {
      type: String,
      enum: ProductCategory,
      required: [true, 'Product category is required'],
      trim: true,
    },
    productSubCategory: {
      type: String,
      enum: ProductSubCategory,
      required: [true, 'Product subcategory is required'],
      trim: true,
    },
    productVeriants: {
      type: Schema.Types.ObjectId,
      ref: 'variant',
      default: null,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    discount: {
      type: Number,
      default: 0,
      min: [0, 'Discount cannot be negative'],
    },
    perUnitCost: {
      type: Number,
      required: [true, 'Per unit cost is required'],
      min: [0, 'Per unit cost cannot be negative'],
    },
    productThumbnail: {
      type: String,
      required: [true, 'Product thumbnail is required'],
      trim: true,
    },
    productImages: {
      type: [String],
      default: [],
    },
    productReviews: {
      type: Schema.Types.ObjectId,
      ref: 'review',
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Product = model<TProduct>('product', ProductSchema);
