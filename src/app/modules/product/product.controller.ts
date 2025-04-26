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


const getAllProduct = catchAsync(async(req, res) => {

    const data = await ProductServices.getAllProductFromDB(req.query, req.params.audiance);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully retrive all product!',
        data: data
    });

});


const getSingleProduct = catchAsync(async(req, res) => {

    const data = await ProductServices.getSingleProductFromDB(req.params.productId);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully retrive the product!',
        data: data
    });

});


const getSimilerProduct = catchAsync(async(req, res) => {

    const {audience, subCategory, currentProductId} = req.query;
    const data = await ProductServices.getSimilerProductFromDB(audience as string, subCategory as string, currentProductId as string);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully retrive similer product!',
        data: data
    });

});



export const ProductController = {
    addProduct,
    getAllProduct,
    getSingleProduct,
    getSimilerProduct
}