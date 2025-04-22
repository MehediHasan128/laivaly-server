import httpStatus from 'http-status';
import { User } from "../users/user.model"
import { TAuthCredential, TChangePassowd, TResetData, TUserToken } from "./auth.interface"
import AppError from '../../errors/AppError';
import comparePassword from '../../utils/comparePassword';
import { createToken } from '../../utils/createToken';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import hashUserPassword from '../../utils/hashUserPassword';
import path from 'path';
import fs from 'fs';
import sendMail from '../../utils/sendMail';
import decodedToken from '../../utils/decodedToken';

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

const forgetUserPassword = async(userEmail: string) => {
    
    // Check the user is exist or not
    const isUserExists = await User.findOne({userEmail: userEmail});
    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND, 'No account found with this email address. Please enter the email you used to sign up.');
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

    // Create a json payload
    const jwtPayload: TUserToken = {
        userEmail: isUserExists?.userEmail,
        userId: isUserExists?._id,
        id: isUserExists?.id,
        profileImage: isUserExists?.profileImage,
        role: isUserExists?.role
    };

    // Create reset token for 10 minutes
    const resetPasswordToken = createToken(jwtPayload, config.jwt_access_secret_token as string, '2m');
    
    // Generate password reset link
    const passwordResetLink = `${config.reset_pass_ui_link}?email=${isUserExists?.userEmail}&token=${resetPasswordToken}`;

    const resetEmailHTMLFile = path.join(process.cwd(), 'src/app/templates/pass_reset_email.html');
    let htmlContent = fs.readFileSync(resetEmailHTMLFile, 'utf8');

    const name = `${isUserExists?.userName.firstName} ${isUserExists?.userName.lastName}`

    htmlContent = htmlContent.replace('[User\'s Name]', name).replace('{{RESET_LINK}}', passwordResetLink);

    await sendMail(isUserExists?.userEmail, 'Password reset link', htmlContent);

}

const resetUserPaassword = async(resetData: TResetData, token: string) => {

    // Check the user is exist or not
    const isUserExists = await User.findOne({userEmail: resetData?.userEmail});
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


    // Verify token
    const decoded = decodedToken(token, config.jwt_access_secret_token as string) as JwtPayload;
    if(decoded?.userEmail !== resetData?.userEmail){
        throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden')
    };


    // bcrypt the new password
    const resetPassword = await hashUserPassword(resetData?.password, config.bcrypt_salt_round as string);


    // Now update user pass
    await User.findOneAndUpdate({userEmail: resetData?.userEmail}, {password: resetPassword}, {new: true});

}

export const AuthServices = {
    userSignIn,
    changeUserPassword,
    forgetUserPassword,
    resetUserPaassword
}