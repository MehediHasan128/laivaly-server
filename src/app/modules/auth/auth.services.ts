import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TUserLogin } from "./auth.interface";
import httpStatus from 'http-status';

const userLogin = async(payload: TUserLogin) => {
    
    // Check the user is exist or not
    const isUserExist = await User.findOne({userEmail: payload.userEmail});
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
    }

};


export const AuthServices = {
    userLogin
}