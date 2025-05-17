import catchAsync from '../../utils/catchAsync';
import sendResponce from '../../utils/sendResponce';
import httpStatus from 'http-status';
import { OrderServices } from './order.services';

const handleCreateCheckoutSession = catchAsync(async (req, res) => {
  const data = await OrderServices.createStripeCheckoutSession(req.body);

  sendResponce(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully create stripe session',
    data: data,
  });
});


const getAllOrder = catchAsync(async (req, res) => {
    const data = await OrderServices.getAllOrdersFromDB();
  
    sendResponce(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Retrive all order from database',
      data: data,
    });
  });

export const OrderController = {
  handleCreateCheckoutSession,
  getAllOrder
};
