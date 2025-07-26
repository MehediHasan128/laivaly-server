import { model, Schema } from 'mongoose';
import { TOrder, TOrderItems, TPaymentInfo } from './order.interface';
import { shippingAddressSchema } from '../../global/model';

const orderItemsSchema = new Schema<TOrderItems>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required for each order item.'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required for each order item.'],
  },
  size: {
    type: String,
  },
  color: {
    type: String,
  },
  SKU: {
    type: String,
    required: [true, 'SKU is required for each order item.'],
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
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required for order.'],
    },
    orderItems: {
      type: [orderItemsSchema],
      required: [true, 'At least one order item is required.'],
      validate: {
        validator: (v: TOrderItems[]) => Array.isArray(v) && v.length > 0,
        message: 'Order must contain at least one item.',
      },
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: [true, 'Shipping address is required.'],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ['stripe', 'sslcommerz', 'cod'],
        message: 'Payment method must be either stripe, sslcommerz, or cod.',
      },
      required: [true, 'Payment method is required.'],
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['pending', 'paid', 'failed', 'refunded'],
        message:
          'Payment status must be one of: pending, paid, failed, or refunded.',
      },
      required: [true, 'Payment status is required.'],
      default: 'pending',
    },
    paymentInfo: {
      type: paymentInfoSchema,
    },
    itemsPrice: {
      type: Number,
      required: [true, 'Items price is required.'],
    },
    shippingCharge: {
      type: Number,
      required: [true, 'Shipping charge is required.'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required.'],
    },
    orderStatus: {
      type: String,
      enum: {
        values: ['processing', 'shipped', 'delivered', 'cancelled', 'returned'],
        message:
          'Order status must be one of: processing, shipped, delivered, cancelled, or returned.',
      },
      default: 'processing',
      required: [true, 'Order status is required.'],
    },
  },
  { timestamps: true },
);

export const Order = model<TOrder>('order', createOrderSchema);
