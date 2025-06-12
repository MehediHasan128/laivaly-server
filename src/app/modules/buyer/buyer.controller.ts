import catchAsync from "../../utils/catchAsync"
import sendResponce from "../../utils/sendResponce"
import httpStatus from 'http-status';
import { BuyerServices } from "./buyer.services";

const addBuyerInfo = catchAsync(async(req, res) => {

    const data = await BuyerServices.addBuyerInfoIntoDB(req.params.userId, req.body);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Thanks for completing your profile!',
        data: data
    });

});


const getBuyerInformation = catchAsync(async(req, res) => {

    const data = await BuyerServices.getBuyerInformationFromDB(req.params.userId);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully retrive buyer information',
        data: data
    });

});


const addBuyerProfile = catchAsync(async(req, res) => {

    const data = await BuyerServices.addBuyerProfilePictureIntoDB(req.params.userId, req.file);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully add your profile picture',
        data: data
    });

});


const addShippingAddress = catchAsync(async(req, res) => {

    const data = await BuyerServices.addShippingAddressIntoDB(req.params.userId, req.body);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully add a new shipping address',
        data: data
    });

});


const updateShippingAddress = catchAsync(async(req, res) => {

    const data = await BuyerServices.updateShippingAddressIntoDB(req.params.userId, req.query.addressId as string, req.body);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Your Shipping address successfully update',
        data: data
    });

});


const deleteShippingAddress = catchAsync(async(req, res) => {

    const data = await BuyerServices.deleteShippingAddressFromDB(req.params.userId, req.query.addressId as string);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Your Shipping address successfully delete',
        data: data
    });

});


export const BuyerController = {
    addBuyerInfo,
    addShippingAddress,
    addBuyerProfile,
    getBuyerInformation,
    updateShippingAddress,
    deleteShippingAddress
}