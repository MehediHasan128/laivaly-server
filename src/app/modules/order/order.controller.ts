import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { TCartItem } from '../cart/cart.interface';
import { OrderServices } from './order.services';

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
  createOrderOnCOD,
  getOrdersByUserId,
  getOrdersHistoryByUserId,
  cancelOrder,
  buySingleProduct,
  storedOrderData,
};
