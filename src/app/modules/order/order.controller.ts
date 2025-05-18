import catchAsync from '../../utils/catchAsync';
import sendResponce from '../../utils/sendResponce';
import httpStatus from 'http-status';
import { OrderServices } from './order.services';
import { Request, Response } from 'express';

const handleCreateCheckoutSession = catchAsync(async (req, res) => {
 
  const data = await OrderServices.createStripeCheckoutSession(req.body);

  sendResponce(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Successfully create stripe session',
    data: data,
  });
});


const StripeWebhook = async(req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'] as string;

  try{
    await OrderServices.handleStripeWebhook(req.body, signature);
    res.status(200).json({
      statusCode: httpStatus.OK,
      success: true,
      message: 'Payment successfull'
    })
  }catch(error){
    console.error('❌ Webhook error:', error);
  }
}


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
  StripeWebhook,
  getAllOrder
};
