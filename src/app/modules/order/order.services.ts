import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

import { User } from '../user/user.model';
import { TOrder } from './order.interface';
import { genarateOrderId } from './order.utils';
import { Product } from '../product/product.model';
import { Order } from './order.model';

const createOrderWithCODIntoDB = async (payload: TOrder) => {
  // Check the user is exist
  const isUserExist = await User.findById(payload?.userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check the user id delete
  const isUserDelete = isUserExist?.isDelete;
  if (isUserDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete!');
  }

  // Check the user is banned
  const isUserBanned = isUserExist?.status;
  if (isUserBanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is banned!');
  }

  let itemsPrice = 0;
  let shippingCharge = 0;
  for (const item of payload!.orderItems) {
    const { productId, SKU, quantity, size } = item;

    // Check the product is exist
    const isProductExist = await Product.findById(productId);
    if (!isProductExist) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Product with ID ${productId} not found.`,
      );
    }

    // Find the correct variant by size and SKU
    const matchedVeriant = isProductExist?.variants?.find(
      (veriant) => veriant.size === size || veriant.SKU === SKU,
    );
    if (!matchedVeriant) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Variant not found for product ID: ${productId} with size ${size} and SKU ${SKU}.`,
      );
    }

    if (matchedVeriant.stock < quantity) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        `Only ${matchedVeriant?.stock} item's in stock for ${isProductExist?.title} Size: ${size}, SKU: ${SKU}`,
      );
    }

    // Calculate items total price
    const productPrice = isProductExist?.price * quantity;
    itemsPrice += productPrice;

    // Calculate the shipping charge
    const shippingCost = (Number(isProductExist?.productWeight) / 1000) * 0.5;
    shippingCharge += shippingCost;
  }

  // Now set the total price of the requested items and shipping charge
  payload.itemsPrice = itemsPrice;
  payload.shippingCharge = Number(shippingCharge.toFixed(2));
  // now calculate the total price
  payload.totalPrice = payload?.itemsPrice + payload.shippingCharge;

  // Generate order id and set this id
  const orderId = await genarateOrderId();
  payload.orderId = orderId;

  // Now place the order
  const orderData = await Order.create(payload);
  return orderData;
};

const createOrderWithSSLCommerzIntoDB = async () => {};

const getAllOrderfromDB = async () => {
  const data = await Order.find();
  return data;
};

const getOrdersByUserIdFromDB = async (userId: string) => {
  // Check the user is exist
  const isUserExist = await User.findById(userId);
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
  const data = await Order.find({ userId });
  return data;
};

export const OrderServices = {
  createOrderWithCODIntoDB,
  createOrderWithSSLCommerzIntoDB,
  getAllOrderfromDB,
  getOrdersByUserIdFromDB,
};
