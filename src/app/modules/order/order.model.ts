import { model, Schema } from 'mongoose';
import { TOrder, TOrderItems, TPaymentInfo } from './order.interface';
import { shippingAddressSchema } from '../../global/model';

const orderItemsSchema = new Schema<TOrderItems>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required'],
  },
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  productFor: {
    type: String,
    required: [true, 'Product category (productFor) is required'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative'],
  },
  discount: {
    type: Number,
    required: [true, 'Discount is required'],
    min: [0, 'Discount cannot be negative'],
    max: [100, 'Discount cannot exceed 100%'],
  },
  productImages: {
    type: String,
    required: [true, 'Product image is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
  },
  color: {
    type: String,
    default: null,
  },
  size: {
    type: String,
    default: null,
  },
  SKU: {
    type: String,
    required: [true, 'SKU is required'],
    trim: true,
  },
});

const paymentInfoSchema = new Schema<TPaymentInfo>({
  TXID: {
    type: String,
  },
  email: {
    type: String,
  },
  paidAt: {
    type: Date,
  },
  status: {
    type: String,
    enum: {
      values: ['success', 'failed'],
      message: 'Payment status must be either success or failed.',
    },
  },
});

const createOrderSchema = new Schema<TOrder>(
  {
    orderId: {
      type: String,
      required: [true, 'Order ID is required.'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required for order.'],
    },
    orderItems: {
      type: [orderItemsSchema],
      required: [true, 'Order items are required.'],
      validate: {
        validator: (value: TOrderItems[]) => value.length > 0,
        message: 'Order must have at least one item.',
      },
    },
    subTotal: {
      type: Number,
      required: [true, 'Subtotal is required.'],
    },
    shippingCharge: {
      type: Number,
      required: [true, 'Shipping charge is required.'],
    },
    tax: {
      type: Number,
      required: [true, 'Tax is required.'],
    },
    grandTotal: {
      type: Number,
      required: [true, 'Total price is required.'],
    },
    shippingMethod: {
      type: String,
      enum: {
        values: ['standard', 'second Day', 'overnight'],
        message:
          'Shipping method must be either standard, second Day, or overnight.',
      },
      required: [true, 'Shipping method is required.'],
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: [true, 'Shipping address is required.'],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ['stripe', 'klarna', 'cod'],
        message: 'Payment method must be either stripe, sslcommerz, or cod.',
      },
      required: [true, 'Payment method is required.'],
    },
    paymentInfo: {
      type: paymentInfoSchema,
    },
    paymentStatus: {
      type: String,
      enum: {
        values: [
          'pending',
          'processing',
          'shipped',
          'delivered',
          'cancelled',
          'returned',
        ],
        message:
          'Order status must be one of: pending, processing, shipped, delivered, cancelled, or returned.',
      },
      default: 'pending',
      required: [true, 'Order status is required.'],
    },
    orderStatus: {
      type: String,
      enum: {
        values: [
          'pending',
          'processing',
          'shipped',
          'delivered',
          'cancelled',
          'returned',
        ],
        message:
          'Order status must be one of: pending, processing, shipped, delivered, cancelled, or returned.',
      },
      default: 'pending',
      required: [true, 'Order status is required.'],
    },
  },
  { timestamps: true },
);

export const Order = model<TOrder>('order', createOrderSchema);
