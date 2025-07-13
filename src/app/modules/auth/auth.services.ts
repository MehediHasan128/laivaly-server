import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TUserLogin } from "./auth.interface";
import httpStatus from 'http-status';

const userLogin = async(payload: TUserLogin) => {
    
    // Check the user is exist or not
    const isUserExist = await User.findOne({userEmail: payload.userEmail});
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
    };

    // Check the user is delete or not
    const isUserDeleted = isUserExist.isDelete;
    if(isUserDeleted){
        throw new AppError(httpStatus.FORBIDDEN, 'User is already delete !!');
    }

    // Check the user is banned
    const isUserbanned = isUserExist.status;
    if(isUserbanned === 'banned'){
        throw new AppError(httpStatus.FORBIDDEN, 'User is already banned !!');
    }

};


export const AuthServices = {
    userLogin
}