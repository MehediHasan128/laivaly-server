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

const cancelOrder = catchAsync(async (req, res) => {
  const data = await OrderServices.cancelOrderFromDB(req.params.orderId);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Order cancelled successfully',
    data: data,
  });
});

// const createOrderOnSSLCommerz = catchAsync(async (req, res) => {
//   const data = await OrderServices.createOrderWithSSLCommerzIntoDB();

//   sendResponce(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Your order has been placed and is now being processed.',
//     data: data,
//   });
// });

// const getAllOrders = catchAsync(async (req, res) => {
//   const data = await OrderServices.getAllOrderfromDB();

//   sendResponce(res, {
//     statusCode: 200,
//     success: true,
//     message: 'All order retrive successfully.',
//     data: data,
//   });
// });

// const getOrdersByUserId = catchAsync(async (req, res) => {
//   const data = await OrderServices.getOrdersByUserIdFromDB(req.params.userId);

//   sendResponce(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Your orders retrive successfully.',
//     data: data,
//   });
// });

// const getOrdersForStaff = catchAsync(async (req, res) => {
//   const data = await OrderServices.getOrdersForStaffFromDB(req.params.userId);

//   sendResponce(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Your orders retrive successfully.',
//     data: data,
//   });
// });

// const updateOrderStatus = catchAsync(async (req, res) => {
//   const data = await OrderServices.updateOrderStatusIntoDB(req.params.orderId, req.body);

//   sendResponce(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Order has been shipped.',
//     data: data,
//   });
// });

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
  //   createOrderOnSSLCommerz,
  //   getAllOrders,
  getOrdersByUserId,
  cancelOrder,
  //   getOrdersForStaff,
  //   updateOrderStatus
  buySingleProduct,
  storedOrderData,
};
