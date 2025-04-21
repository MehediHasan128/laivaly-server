import httpStatus from 'http-status';
import { User } from "../users/user.model"
import { TAuthCredential } from "./auth.interface"
import AppError from '../../errors/AppError';
import comparePassword from '../../utils/comparePassword';

const userSignIn = async(payload: TAuthCredential) => {

    // Check the user is exist or not
    const isUserExists = await User.findOne({userEmail: payload?.userEmail});
    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // Check the user is delete or not
    const isUserDelete = isUserExists?.isDeleted;
    if(isUserDelete){
        throw new AppError(httpStatus.FORBIDDEN, 'User is alreday deleted!');
    }

    // Check the user is delete or not
    const userStatus = isUserExists?.status;
    if(userStatus === 'banned'){
        throw new AppError(httpStatus.BAD_REQUEST, 'User is banned!');
    }

    // now ckeck the user password
    const isPasswordMatch = await comparePassword(payload?.password, isUserExists?.password);
    if(!isPasswordMatch){
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid credential');
    }

}

export const AuthServices = {
    userSignIn
}