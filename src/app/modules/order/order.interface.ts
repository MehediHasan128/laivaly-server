import { Types } from 'mongoose';
import { TShippingAddress } from '../../global/interface';

export type TOrderProducts = {
  productId: Types.ObjectId;
  quantity: number;
  color: string;
  size: string;
};

export type TOrder = {
  userId: Types.ObjectId;
  products: [TOrderProducts];
  shippingAddress: TShippingAddress;
  paymentMethod: 'COD' | 'Credit Card' | 'Paypal' | 'Stripe' | 'bKash';
  orderDate: Date;
  totalAmount: number;
  paymentStatus: 'paid' | 'unpaid';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
};
