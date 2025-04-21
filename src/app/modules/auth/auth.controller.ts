import catchAsync from "../../utils/catchAsync"
import sendResponce from "../../utils/sendResponce"
import httpStatus from 'http-status';
import { AuthServices } from "./auth.services";
import config from "../../config";

const userSignIn = catchAsync(async(req, res) => {

    const data = await AuthServices.userSignIn(req.body);

    const {accessToken, refreshToken} = data;

    res.cookie('refreshToken', refreshToken, {secure: config.node_env === 'production', httpOnly: true});

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User logged in successfully!',
        data: {
            accessToken
        }
    });

});


const changePassword = catchAsync(async(req, res) => {

    const data = await AuthServices.changeUserPassword(req.user, req.body);

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