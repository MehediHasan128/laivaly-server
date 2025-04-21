import httpStatus from 'http-status';
import { User } from "../users/user.model"
import { TAuthCredential, TChangePassowd, TUserToken } from "./auth.interface"
import AppError from '../../errors/AppError';
import comparePassword from '../../utils/comparePassword';
import { createToken } from '../../utils/createToken';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import hashUserPassword from '../../utils/hashUserPassword';

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
    // Create refresh token
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret_token as string, Number(config.jwt_refresh_expire_in) as number);
    
    return {
        accessToken,
        refreshToken
    }

};

const changeUserPassword = async(userData: JwtPayload, payload: TChangePassowd) => {

    // Check the user is exist or not
    const isUserExists = await User.findOne({userEmail: userData?.userEmail});
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


    // Check the old password is correct or not
    const isOldPasswordIsCorrect = await comparePassword(payload?.oldPassword, isUserExists?.password);
    if(!isOldPasswordIsCorrect){
        throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect Password!');
    }

    // If old password is correct then bcrypt the new password and update
    const newPassword = await hashUserPassword(payload?.newPassword, config.bcrypt_salt_round as string);

    await User.findOneAndUpdate({userEmail: userData?.userEmail}, {password: newPassword}, {new: true});

}

export const AuthServices = {
    userSignIn,
    changeUserPassword
}