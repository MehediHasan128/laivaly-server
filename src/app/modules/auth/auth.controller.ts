import catchAsync from "../../utils/catchAsync"
import sendResponce from "../../utils/sendResponce"
import httpStatus from 'http-status';
import { AuthServices } from "./auth.services";

const userSignIn = catchAsync(async(req, res) => {

    const data = await AuthServices.userSignIn(req.body);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User logged in successfully!',
        data: data
    });

});


const changePassword = catchAsync(async(req, res) => {

    const data = await AuthServices.changeUserPassword(req.body);

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Your password is update!',
        data: data
    });

})


export const AuthController = {
    userSignIn,
    changePassword
}