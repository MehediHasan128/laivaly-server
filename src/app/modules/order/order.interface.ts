import { Types } from 'mongoose';
import { TShippingAddress } from '../../global/interface';

export interface TOrderItems {
  productId: Types.ObjectId;
  title: string;
  productFor: string;
  price: number;
  discount: number;
  productImages: string;
  quantity: number;
  color?: string;
  size?: string;
  SKU: string;
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
  orderItems: TOrderItems[];
  subTotal: number;
  shippingCharge: number;
  tax: number;
  grandTotal: number;
  shippingMethod: 'standard' | 'second Day' | 'overnight';
  shippingAddress: TShippingAddress;
  paymentMethod: 'stripe' | 'klarna' | 'cod';
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
