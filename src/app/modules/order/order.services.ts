import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

import { User } from '../user/user.model';
import { TOrder } from './order.interface';
import { genarateOrderId } from './order.utils';
import { Product } from '../product/product.model';
import { Order } from './order.model';
import { Staff } from '../staff/staff.model';

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

const getOrdersForStaffFromDB = async (userId: string) => {
  // Check the staff is exist
  const isStaffExist = await User.findById(userId);
  if (!isStaffExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Staff account not found!');
  }

  // Check the staff is exist
  const isStaffDelete = isStaffExist?.isDelete;
  if (isStaffDelete) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Staff account is already delete!',
    );
  }

  // Check the staff is exist
  const isStaffBanned = isStaffExist?.status;
  if (isStaffBanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'Staff account is banned!');
  }

  // Const staff address
  const getStaffAddress = await Staff.findOne({ userId }).select(
    '-_id presentAddress',
  );
  const staffCountry = getStaffAddress?.presentAddress?.country;

  // find orders
  const data = await Order.find({ 'shippingAddress.country': staffCountry });
  return data;
};

const updateOrderStatusIntoDB = async (
  orderId: string,
  {
    status,
  }: {
    status: 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  },
) => {
  // Check the order is exist on database
  const isOrderExist = await Order.findById(orderId);
  if (!isOrderExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found!');
  }

  if (isOrderExist) {
    isOrderExist.orderStatus = status;
    await isOrderExist.save();
  }

  const orderItems = isOrderExist?.orderItems;

  for (const item of orderItems) {
    const product = await Product.findById(item?.productId);

    const productVeriants = product?.variants;
    const veriant = productVeriants?.find((v) => v.SKU === item.SKU);

    veriant!.stock = veriant!.stock - item.quantity;

    await product?.save();
  }
};

export const OrderServices = {
  createOrderWithCODIntoDB,
  createOrderWithSSLCommerzIntoDB,
  getAllOrderfromDB,
  getOrdersByUserIdFromDB,
  getOrdersForStaffFromDB,
  updateOrderStatusIntoDB,
};
