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



export const WhislistController = {
    addWhislist
}