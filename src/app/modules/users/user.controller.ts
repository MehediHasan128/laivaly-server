import catchAsync from "../../utils/catchAsync"
import sendResponce from "../../utils/sendResponce"
import httpStatus from 'http-status';
import { UserServices } from "./user.services";

const createUser = catchAsync(async(req, res) => {

    const data = await UserServices.cresteUserIntoDB();

    sendResponce(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: '',
        data: data
    })

})


export const UserController = {
    createUser
}