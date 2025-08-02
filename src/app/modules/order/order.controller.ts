import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
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

const createOrderOnSSLCommerz = catchAsync(async (req, res) => {
  const data = await OrderServices.createOrderWithSSLCommerzIntoDB();

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Your order has been placed and is now being processed.',
    data: data,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const data = await OrderServices.getAllOrderfromDB();

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'All order retrive successfully.',
    data: data,
  });
});

const getOrdersByUserId = catchAsync(async (req, res) => {
  const data = await OrderServices.getOrdersByUserIdFromDB(req.params.userId);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Your orders retrive successfully.',
    data: data,
  });
});

export const OrderController = {
  createOrderOnCOD,
  createOrderOnSSLCommerz,
  getAllOrders,
  getOrdersByUserId
};
