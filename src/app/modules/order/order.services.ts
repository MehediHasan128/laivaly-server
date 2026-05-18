/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TOrder } from './order.interface';
// import { Product } from '../product/product.model';
// import { TProduct } from '../product/product.interface';
// import { Variant } from '../productVariant/variant.model';
import { genarateOrderId } from './order.utils';
import { Order } from './order.model';
import { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { Product } from '../product/product.model';
import { TProduct } from '../product/product.interface';
import { Variant } from '../productVariant/variant.model';
import { stripe } from '../../config/stripe';

const createStripeCheckOutSession = async (payload: TOrder) => {
  const orderId = await genarateOrderId();
  payload.orderId = orderId;

  const order = await Order.create(payload);

  const lineItems = payload?.orderItems.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item?.title,
        images: [item?.productImages],
      },
      unit_amount: Math.round(item?.price * 100),
    },

    quantity: item?.quantity,
  }));

  // Shipping charge add
  lineItems.push({
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Shipping Charge',
        images: [],
      },
      unit_amount: Math.round(payload?.shippingCharge * 100),
    },
    quantity: 1,
  });

  // Tax
  lineItems.push({
    price_data: {
      currency: 'usd',
      product_data: {
        name: 'Tax',
        images: [],
      },
      unit_amount: Math.round(payload?.tax * 100),
    },
    quantity: 1,
  });

  // Stripe session create
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: lineItems,
    success_url: `${config.node_env === 'production' ? config.production_client_url : config.client_url}/my-account/orders`,
    cancel_url: `${config.node_env === 'production' ? config.production_client_url : config.client_url}/payment/cancel`,

    metadata: {
      orderId: order._id.toString() || '',
    },
  });

  return session.url;
};

const createKalarnaCheckOutSession = async (payload: TOrder) => {
  try {
    // Generate order id and set this id
    const orderId = await genarateOrderId();
    payload.orderId = orderId;

    const order_lines = payload?.orderItems.map((item) => {
      const priceAfterDiscound =
        item?.price - (item?.price * item.discount) / 100;
      const unit_price = Math.round(priceAfterDiscound * 100);
      const quantity = item?.quantity;
      const tax_rate = 500;

      const total_amount = unit_price * quantity;
      const tax_amount =
        total_amount - Math.round(total_amount / (1 + tax_rate / 10000));

      return {
        name: item?.title,
        type: 'physical',
        quantity,
        unit_price,
        total_amount,
        tax_rate,
        total_tax_amount: tax_amount,
      };
    });

    if (payload?.shippingCharge && payload?.shippingCharge > 0) {
      const shipping_amount = Math.round(payload.shippingCharge * 100);

      order_lines.push({
        name: 'Shipping',
        type: 'shipping_fee',
        quantity: 1,
        unit_price: shipping_amount,
        total_amount: shipping_amount,
        tax_rate: 0,
        total_tax_amount: 0,
      });
    }

    const klarnaPayload = {
      purchase_country: 'US',
      purchase_currency: 'USD',
      locale: 'en-US',
      order_amount: order_lines.reduce(
        (sum, item) => sum + item.total_amount,
        0,
      ),
      order_tax_amount: order_lines.reduce(
        (sum, item) => sum + item.total_tax_amount,
        0,
      ),
      order_lines,
      merchant_urls: {
        checkout: `${config.client_url}/checkout`,
        confirmation: `${config.client_url}/payment/success`,
        push: `${config.server_url}/orders/klarna-push`,
        cancel: `${config.client_url}/payment/cancel`,
        terms: `${config.client_url}/terms`,
      },
      merchant_reference1: payload?.orderId,
    };

    const authHEader =
      'Basic ' +
      Buffer.from(
        `${config.klarna_username}:${config.klarna_password}`,
      ).toString('base64');

    const res = await fetch(config.klarna_API_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHEader,
      },
      body: JSON.stringify(klarnaPayload),
    });

    const data = await res.json();
    console.log(data);
  } catch (err: any) {
    console.error('Klarna session create error:', err.message);
    throw new Error('Failed to create Klarna session');
  }
};

const klarnaPush = async () => {
  console.log(5);
};

const createOrderWithCODIntoDB = async (payload: TOrder) => {
  // Check the user is exit or not
  const isUserExist = await User.findById(payload?.userId).select('-password');
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check the user is delete
  const isUserDelete = isUserExist?.isDelete;
  if (isUserDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete!');
  }

  // Check the user is banned
  const isUserBanned = isUserExist?.status;
  if (isUserBanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is banned!');
  }

  // now get the order items
  const orderItems = payload?.orderItems;

  for (const item of orderItems) {
    // Check the product is exist
    const isProductExist = (await Product.findById(
      item?.productId,
    )) as TProduct;
    const { title } = isProductExist;
    if (!isProductExist) {
      throw new AppError(httpStatus.NOT_FOUND, `${title} is not found`);
    }

    // Check the product is delete
    const isProductDelete = isProductExist?.isDeleted;
    if (isProductDelete) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is already delete!');
    }

    const productVariantId = isProductExist?.productVariants;
    const selectedProductVariants = await Variant.findById(productVariantId);
    const variants = selectedProductVariants?.variants;
    const selectedVariantSKU = item.SKU;

    const sizeVariants = [];
    for (const variant of variants!) {
      const productSizeVariant = variant?.sizes;

      for (const sizes of productSizeVariant) {
        sizeVariants.push(sizes);
      }
    }

    const selecteVariant = sizeVariants?.find(
      (v) => v.SKU === selectedVariantSKU,
    );

    const selectedQuantity = item?.quantity;
    const availableStock = selecteVariant?.stock;

    if (selectedQuantity > availableStock!) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        `Only ${availableStock} unit available`,
      );
    }
  }

  // Generate order id and set this id
  const orderId = await genarateOrderId();
  payload.orderId = orderId;

  // Now place the order
  const newOrder = await Order.create(payload);
  return newOrder;
};

const getOrdersByUserIdFromDB = async (user: JwtPayload) => {
  // Check the user is exist
  const isUserExist = await User.findById(user?.userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check the user is delete
  const isUserDelete = isUserExist?.isDelete;
  if (isUserDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete!');
  }

  // Check the user is banned
  const isUserBanned = isUserExist?.status;
  if (isUserBanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is banned!');
  }

  // Find the orders using user id
  const data = await Order.find({
    userId: user?.userId,
    orderStatus: { $ne: 'cancelled' },
  });
  return data;
};

const getOrderHistoryByUserIdFromDB = async (user: JwtPayload) => {
  // Check the user is exist
  const isUserExist = await User.findById(user?.userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check the user is delete
  const isUserDelete = isUserExist?.isDelete;
  if (isUserDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete!');
  }

  // Check the user is banned
  const isUserBanned = isUserExist?.status;
  if (isUserBanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is banned!');
  }

  const data = await Order.find({
    userId: user?.userId,
    orderStatus: { $in: ['cancelled', 'delivered', 'returned'] },
  });

  console.log(data);
  return data;
};

const cancelOrderFromDB = async (orderId: string) => {
  // Check the order is exit or not
  const isOrderExist = await Order.findById(orderId);
  if (!isOrderExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found!');
  }

  // Check the order Status
  const orderStatus = isOrderExist?.orderStatus;
  if (orderStatus !== 'pending') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'This order has already been shipped.',
    );
  }

  // Now change the order status
  await Order.findByIdAndUpdate(
    orderId,
    { orderStatus: 'cancelled' },
    { new: true },
  );
};

export const OrderServices = {
  createStripeCheckOutSession,
  createKalarnaCheckOutSession,
  klarnaPush,
  createOrderWithCODIntoDB,
  getOrdersByUserIdFromDB,
  getOrderHistoryByUserIdFromDB,
  cancelOrderFromDB,
};
