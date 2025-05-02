import catchAsync from "../../utils/catchAsync"
import sendResponce from "../../utils/sendResponce"
import httpStatus from 'http-status';
import { CartServices } from "./cart.services";

const addCart = catchAsync(async(req, res) => {

    const data = await CartServices.addCartIntoDB(req.body);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Product is add to cart',
        data: data
    });

});


const getAllProductFromCart = catchAsync(async(req, res) => {

    const data = await CartServices.getAllCartProductFromDB(req.params.userId);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully retrive all product from cart',
        data: data
    });

});


const productAddOrRemove = catchAsync(async(req, res) => {

    const data = await CartServices.productAddOrRemoveFromCart();

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully update product from cart',
        data: data
    });

});



export const CartController = {
    addCart,
    getAllProductFromCart,
    productAddOrRemove
}