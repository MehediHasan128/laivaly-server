import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { CartServices } from './cart.services';

const addProductIntoCart = catchAsync(async (req, res) => {
  const data = await CartServices.addProductIntoCart(req.params.userId, req.body);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'The product has been added to your cart.',
    data: data,
  });
});

const getALlProductFromCart = catchAsync(async (req, res) => {
  const data = await CartServices.getALlProductFromCart(req.params.userId);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Cart items retrieved successfully.',
    data: data,
  });
});

export const CartController = {
  addProductIntoCart,
  getALlProductFromCart
};
