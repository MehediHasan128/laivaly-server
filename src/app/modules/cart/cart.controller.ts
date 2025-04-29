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



export const CartController = {
    addCart,
}