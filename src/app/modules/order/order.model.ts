import { model, Schema } from 'mongoose';
import {
  TOrder,
  TOrderProducts,
} from './order.interface';
import { ShippingAddressSchema } from '../../global/model';

const OrderProductSchema = new Schema<TOrderProducts>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: [true, 'Product ID is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    trim: true,
  },
  size: {
    type: String,
    required: [true, 'Size is required'],
    trim: true,
  },
});

const OrderSchema = new Schema<TOrder>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  products: {
    type: [OrderProductSchema],
    validate: {
      validator: (v: TOrderProducts[]) => v.length > 0,
      message: 'At least one product must be included in the order',
    },
    required: [true, 'Products are required'],
  },
  shippingAddress: ShippingAddressSchema,
  paymentMethod: {
    type: String,
    enum: {
      values: ['COD', 'Credit Card', 'Paypal', 'Stripe', 'bKash'],
      message:
        'Payment method must be one of COD, Credit Card, Paypal, Stripe, or bKash',
    },
    required: [true, 'Payment method is required'],
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Total amount must be at least 0'],
  },
  paymentStatus: {
    type: String,
    enum: {
      values: ['paid', 'unpaid'],
      message: 'Payment status must be either paid or unpaid',
    },
    default: 'unpaid',
  },
  status: {
    type: String,
    enum: {
      values: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      message:
        'Status must be one of pending, confirmed, shipped, delivered, or cancelled',
    },
    default: 'pending',
  },
});

export const Order = model<TOrder>('order', OrderSchema);
