import httpStatus from 'http-status';
import { User } from "../users/user.model"
import { TAuthCredential, TUserToken } from "./auth.interface"
import AppError from '../../errors/AppError';
import comparePassword from '../../utils/comparePassword';
import { createToken } from '../../utils/createToken';
import config from '../../config';

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

    // Create a json payload
    const jwtPayload: TUserToken = {
        userEmail: isUserExists?.userEmail,
        userId: isUserExists?._id,
        id: isUserExists?.id,
        profileImage: isUserExists?.profileImage,
        role: isUserExists?.role
    };


    // Create access token
    const accessToken = createToken(jwtPayload, config.jwt_access_secret_token as string, Number(config.jwt_access_expire_in) as number);
    
    return {
        accessToken
    }

}

export const AuthServices = {
    userSignIn
}