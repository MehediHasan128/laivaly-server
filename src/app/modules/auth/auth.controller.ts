import { catchAsync } from "../../utils/catchAsync";
import { sendResponce } from "../../utils/sendResponce";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async(req, res) => {
    
    const data = await AuthServices.userLogin(req.body);

    sendResponce(res, {
        statusCode: 200,
        success: true,
        message: 'User is logged in succesfully!',
        data: data
    })

});


export const AuthController = {
    loginUser
}