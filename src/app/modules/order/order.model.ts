import { model, Schema } from 'mongoose';
import { TOrder, TOrderItem, TPaymentInfo } from './order.interface';
import { shippingAddressSchema } from '../../global/model';
import { selectedVariantSchema } from '../cart/cart.model';

const orderItemsSchema = new Schema<TOrderItem>({
  productId: {
    type: Schema.Types.ObjectId,
    required: [true, 'Product ID is required!'],
    ref: 'product',
  },
  productTitle: {
    type: String,
    required: [true, 'Product title is required!'],
  },
  productThumbnail: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: [true, 'Product quantity is required!'],
  },
  selectedVariant: selectedVariantSchema,
  totalPrice: {
    type: Number,
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
        validator: (v: TOrderItem[]) => Array.isArray(v) && v.length > 0,
        message: 'Order must contain at least one item.',
      },
    },
    shippingCharge: {
      type: Number,
      required: [true, 'Shipping charge is required.'],
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
        values: ['stripe', 'sslcommerz', 'cod'],
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
        values: ['pending', 'paid', 'failed', 'refunded'],
        message:
          'Payment status must be one of: pending, paid, failed, or refunded.',
      },
      required: [true, 'Payment status is required.'],
      default: 'pending',
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
