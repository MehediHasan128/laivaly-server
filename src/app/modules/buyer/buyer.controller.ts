import catchAsync from "../../utils/catchAsync"
import sendResponce from "../../utils/sendResponce"
import httpStatus from 'http-status';
import { BuyerServices } from "./buyer.services";

const addBuyerInfo = catchAsync(async(req, res) => {

    const data = await BuyerServices.addBuyerInfoIntoDB(req.params.buyerId, req.body);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Thanks for completing your profile!',
        data: data
    });

})


export const BuyerController = {
    addBuyerInfo
}