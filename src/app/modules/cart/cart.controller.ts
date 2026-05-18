import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { CartServices } from './cart.services';

const addProductIntoCart = catchAsync(async (req, res) => {
  const data = await CartServices.addProductIntoCart(req.user, req.body);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'The product has been added to your cart.',
    data: data,
  });
});

const getAllProductFromCart = catchAsync(async (req, res) => {
  const data = await CartServices.getAllProductFromCart(req.user);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Cart items retrieved successfully.',
    data: data,
  });
});

const deleteProductFromCart = catchAsync(async (req, res) => {
  const data = await CartServices.deleteProductFromCart(
    req.user,
    req.params.cartId as string,
  );

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'The item has been removed from your cart.',
    data: data,
  });
});

// const updateProductQuantity = catchAsync(async (req, res) => {
//   const data = await CartServices.updateProductQuantity(req.params.userId, req.query.productId as string, req.query.SKU as string, req.query.action as string);

//   sendResponce(res, {
//     statusCode: 200,
//     success: true,
//     message: 'The item has been removed from your cart.',
//     data: data,
//   });
// });

export const CartController = {
  addProductIntoCart,
  getAllProductFromCart,
  deleteProductFromCart,
  // updateProductQuantity
};
