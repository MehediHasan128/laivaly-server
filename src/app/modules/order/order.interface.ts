import { Types } from 'mongoose';

export type TOrderProducts = {
  productId: Types.ObjectId;
  quantity: number;
  color: string;
  size: string;
};

export type TOrderShippingAddress = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type TOrder = {
  userId: Types.ObjectId;
  products: [TOrderProducts];
  shippingAddress: TOrderShippingAddress;
  paymentMethod: 'COD' | 'Credit Card' | 'Paypal' | 'Stripe' | 'bKash';
  orderDate: Date;
  totalAmount: number;
  deliveryCharge: number;
  discount: number;
  paymentStatus: 'paid' | 'unpaid';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
};
