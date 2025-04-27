import catchAsync from "../../utils/catchAsync"
import sendResponce from "../../utils/sendResponce"
import httpStatus from 'http-status';
import { WhislistServices } from "./whislist.services";

const addWhislist = catchAsync(async(req, res) => {

    const data = await WhislistServices.addWhislistIntoDB(req.body);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Product add to whislist!',
        data: data
    });

});


const getUserWhislist = catchAsync(async(req, res) => {

    const data = await WhislistServices.getAllWhislitBasedonUserFromDB(req.params.userId);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully retrive all whislist!',
        data: data
    });

});


const singleWhislistProduct = catchAsync(async(req, res) => {

    const data = await WhislistServices.getSingleProductFromWhislist(req.query.userId as string, req.query.productId as string);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully retive single product from whislist!',
        data: data
    });

});


const deleteWhislist = catchAsync(async(req, res) => {

    const data = await WhislistServices.deleteWhislistFromDB(req.params.whislistId);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully delete this product from whislist!',
        data: data
    });

});



export const WhislistController = {
    addWhislist,
    getUserWhislist,
    singleWhislistProduct,
    deleteWhislist
}