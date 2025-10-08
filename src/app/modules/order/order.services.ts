import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TOrder } from './order.interface';
import { Product } from '../product/product.model';
import { TProduct } from '../product/product.interface';
import { Variant } from '../productVariant/variant.model';
import { genarateOrderId } from './order.utils';
import { Order } from './order.model';
import { JwtPayload } from 'jsonwebtoken';

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

    const productVariantId = isProductExist?.productVeriants;
    const selectedProductVariants =
      await Variant.findById(productVariantId).select('-_id variants');
    const variants = selectedProductVariants?.variants;
    const selectedVariantSKU = item.SKU;

    const selecteVariant = variants?.find(
      (variant) => (variant.SKU = selectedVariantSKU),
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
  createOrderWithCODIntoDB,
  getOrdersByUserIdFromDB,
  getOrderHistoryByUserIdFromDB,
  cancelOrderFromDB,
};
