/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import { stripe } from '../../utils/stripe';
import { Product } from '../product/product.model';
import { TOrder } from './order.interface';
import httpStatus from 'http-status';
import { Order } from './order.model';
import config from '../../config';
import Stripe from 'stripe';
import { User } from '../users/user.model';
import { Buyer } from '../buyer/buyer.model';

const createStripeCheckoutSession = async (orderData: TOrder) => {

  const buyerAddress = await Buyer.findOne({userId: orderData.userId}, { shippingAddress: { $elemMatch: { _id: orderData.shippingAddress } } });
  const shippingAddress = buyerAddress!.shippingAddress?.[0];

  const data: Partial<TOrder> = {};

  data.userId = orderData.userId;
  data.products = orderData.products;
  data.shippingAddress = shippingAddress
  data.paymentMethod = orderData.paymentMethod;
  data.orderDate = orderData.orderDate;
  data.paymentStatus = orderData.paymentStatus;
  data.status = orderData.status;
  data.totalAmount = orderData.totalAmount;

  const lineItems = await Promise.all(
    data.products.map(async (item) => {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
      }

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.title,
            metadata: {
              color: item.color,
              size: item.size,
            },
          },
          unit_amount: Math.round((product.price || 0) * 100),
        },
        quantity: item.quantity,
      };
    }),
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:5173/profile/my-orders',
    cancel_url: 'http://localhost:5173/cart/checkout',
    metadata: {
      userId: orderData.userId.toString(),
      products: JSON.stringify(orderData.products),
      shippingAddress: JSON.stringify(orderData.shippingAddress),
      totalAmount: String(orderData.totalAmount)
    },
  });

  return session.url;
};

const handleStripeWebhook = async (data: Buffer, signature: string) => {
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      data,
      signature,
      config.stripe_webhook_key as string,
    );
  } catch (err: any) {
    if (err) {
      console.error('Signature verification failed:', err.message);
      throw new AppError(httpStatus.BAD_REQUEST, 'Webhook signature error');
    }
  }

  if (event?.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const metadata = session.metadata;

    const order = {
      userId: metadata?.userId,
      products: JSON.parse(metadata?.products || '[]'),
      shippingAddress: JSON.parse(metadata?.shippingAddress || '{}'),
      paymentMethod: 'Stripe',
      orderDate: new Date(),
      totalAmount: Number(metadata!.totalAmount),
      paymentStatus: 'paid',
      status: 'confirmed',
    };

    await Order.create(order);
  }
};

const getAllOrdersFromDB = async () => {
  const data = await Order.find()
    .populate({ path: 'userId', select: '_id userName profileImage' })
    .populate('products.productId');
  return data;
};

const getUserOrdersFromDB = async (userId: string) => {
  
  // Check the user is exist or not
  const isUserExist = await User.findById(userId);
  if(!isUserExist){
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  };

  const data = await Order.find({userId});

  return data;

}

export const OrderServices = {
  createStripeCheckoutSession,
  handleStripeWebhook,
  getAllOrdersFromDB,
  getUserOrdersFromDB
};
