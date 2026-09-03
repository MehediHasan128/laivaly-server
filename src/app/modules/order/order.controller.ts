/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler } from 'express';
import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { TCartItem } from '../cart/cart.interface';
import { OrderServices } from './order.services';
import { stripe } from '../../config/stripe';
import { Order } from './order.model';

const stripeCheckoutSession = catchAsync(async (req, res) => {
  const data = await OrderServices.createStripeCheckOutSession(req.body);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Stripe checkout session created successfully.',
    data: data,
  });
});

export const stripeWebhook: RequestHandler = async (req, res) => {
  try {
    const signature = req.headers['stripe-signature'] as string;

    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      config.stripe_webhook_key as string,
    );

    if (event.type === 'checkout.session.completed') {
      const session: any = event.data.object;

      const orderId = session.metadata?.orderId;

      console.log('Payment Successful for Order ID:', orderId);

      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: 'paid',
        'paymentInfo.TXID': session.payment_intent,
        'paymentInfo.paidAt': new Date(),
        'paymentInfo.status': 'success',
      });
    }

    res.status(200).json({ received: true });
  } catch (error: any) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

const kalarnaSession = catchAsync(async (req, res) => {
  const data = await OrderServices.createKalarnaCheckOutSession(req.body);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Klarna checkout session created successfully.',
    data: data,
  });
});

const klarnaPush = catchAsync(async (req, res) => {
  const data = await OrderServices.klarnaPush();

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: data,
  });
});

const createOrderOnCOD = catchAsync(async (req, res) => {
  const data = await OrderServices.createOrderWithCODIntoDB(req.body);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Your order has been confirmed with Cash on Delivery.',
    data: data,
  });
});

const getOrdersByUserId = catchAsync(async (req, res) => {
  const data = await OrderServices.getOrdersByUserIdFromDB(req.user);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: data,
  });
});

const getOrdersHistoryByUserId = catchAsync(async (req, res) => {
  const data = await OrderServices.getOrderHistoryByUserIdFromDB(req.user);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: data,
  });
});

const getOrdersFromDB = catchAsync(async (req, res) => {
  const data = await OrderServices.getAllOrdersFromDB(req.query);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: data,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const data = await OrderServices.getSinfleOrderByIdFromDB(req.params.id);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: data,
  });
});

const cancelOrder = catchAsync(async (req, res) => {
  const data = await OrderServices.cancelOrderFromDB(req.params.orderId);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Order cancelled successfully',
    data: data,
  });
});

const buySingleProduct = catchAsync(async (req, res) => {
  const isProduction = config.node_env === 'production';
  const product: TCartItem = req.body;

  const buySingleProduct: TCartItem[] = [product];

  // set cookie (expires in 10 min)
  res.cookie('buySingleProduct', JSON.stringify(buySingleProduct), {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    domain: isProduction ? '.laivaly.com' : undefined,
    maxAge: 1000 * 60 * 60 * 5,
  });

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: null,
  });
});

const storedOrderData = catchAsync(async (req, res) => {
  const isProduction = config.node_env === 'production';
  const orderData = req.body;

  // set cookie (expires in 10 min)
  res.cookie('orderData', JSON.stringify(orderData), {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    domain: isProduction ? '.laivaly.com' : undefined,
    maxAge: 1000 * 60 * 60 * 5,
  });

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: null,
  });
});

export const OrderController = {
  stripeCheckoutSession,
  stripeWebhook,
  kalarnaSession,
  klarnaPush,
  createOrderOnCOD,
  getOrdersByUserId,
  getOrdersHistoryByUserId,
  getOrdersFromDB,
  getSingleOrder,
  cancelOrder,
  buySingleProduct,
  storedOrderData,
};
