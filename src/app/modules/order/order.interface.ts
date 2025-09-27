import { Types } from 'mongoose';
import { TShippingAddress } from '../../global/interface';

export interface TOrderItem {
  productId: Types.ObjectId;
  productTitle: string;
  productThumbnail: string;
  quantity: number;
  selectedVariant: {
    color?: string;
    size?: string;
    SKU: string;
  };
  totalPrice: number;
}

export interface TPaymentInfo {
  TXID?: string;
  email?: string;
  paidAt?: Date;
  status?: 'success' | 'failed';
}

export interface TOrder {
  orderId: string;
  userId: Types.ObjectId;
  orderItems: TOrderItem[];
  shippingCharge: number;
  grandTotal: number;
  shippingMethod: 'standard' | 'second Day' | 'overnight';
  shippingAddress: TShippingAddress;
  paymentMethod: 'stripe' | 'sslcommerz' | 'cod';
  paymentInfo?: TPaymentInfo;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  orderStatus:
    | 'pending'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'returned';
}
