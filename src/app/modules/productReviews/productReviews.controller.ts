import catchAsync from "../../utils/catchAsync"
import sendResponce from "../../utils/sendResponce"
import httpStatus from 'http-status';
import { ReviewServices } from "./productReviews.services";

const addProductReview = catchAsync(async(req, res) => {

    const data = await ReviewServices.addReviewIntoDB(req.params.productId, req.body);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully add review!',
        data: data
    });

});


const getAllReviews = catchAsync(async(req, res) => {

    const data = await ReviewServices.getAllReviewsFromDB(req.params.productId);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Successfully retrive all review!',
        data: data
    });

});



export const ReviewController = {
    addProductReview,
    getAllReviews
}