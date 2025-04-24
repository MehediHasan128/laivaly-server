import catchAsync from "../../utils/catchAsync"
import sendResponce from "../../utils/sendResponce"
import httpStatus from 'http-status';
import { ProductServices } from "./product.services";

const addProduct = catchAsync(async(req, res) => {

    const data = await ProductServices.addProductIntoDB(req.files, req.body);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully add this product!',
        data: data
    });

});


export const ProductController = {
    addProduct
}