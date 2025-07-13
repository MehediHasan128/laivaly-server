import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TUserLogin } from "./auth.interface";
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from "../../config";
import { createToken } from "./auth.utils";
import path from 'path';
import fs from 'fs';
import { sendMail } from "../../utils/sendEmail";

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

    // Check the user password is correct
    const isPasswordMatch = await bcrypt.compare(payload?.password, isUserExist?.password);
    if(!isPasswordMatch){
        throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect password !!');
    }

    // create token
    const jwtPayload = {
        userId: isUserExist?.id,
        userName: isUserExist?.userName,
        userEmail: isUserExist?.userEmail,
        userProfileURL: isUserExist?.userProfileURL,
        userRole: isUserExist?.role
    }

    // Create access token
    const accessToken = createToken(jwtPayload, config.jwt_access_secret as string, config.jwt_access_expires_in as string);

    // Create refresh token
    const refreshToken = createToken(jwtPayload, config.jwt_refresh_secret as string, config.jwt_refresh_expires_in as string)
    
    return {
        accessToken,
        refreshToken,
    }

};

const forgetUserPassword = async(userEmail: string) => {
    
    // Check the user is exist or not
    const isUserExist = await User.findOne({userEmail: userEmail});
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
    };

    // create token
    const jwtPayload = {
        userId: isUserExist?.id,
        userName: isUserExist?.userName,
        userEmail: isUserExist?.userEmail,
        userProfileURL: isUserExist?.userProfileURL,
        userRole: isUserExist?.role
    }

    // Create reset token for 5 min
    const resetToken = createToken(jwtPayload, config.jwt_access_secret as string, '300');

    // Createe password rest ui link
    const resetPasswordUILink = `${config.reset_password_ui_link}?userEmail=${isUserExist.userEmail}&token=${resetToken}`

    // Get password reset ui hyml file
    const resetEmailUiHTMLFile = path.join(process.cwd(), 'src/app/templates/pass_reset_email.html');

    // Get the html content
    let htmlContent = fs.readFileSync(resetEmailUiHTMLFile, 'utf8');

    // Get the userName 
    const userName = `${isUserExist?.userName.firstName} ${isUserExist?.userName.lastName}`;

    // Now replace the html content
    htmlContent = htmlContent.replace('[User\'s Name]', userName).replace('{{RESET_LINK}}', resetPasswordUILink);

    // Send email with password reset link
    await sendMail(isUserExist?.userEmail, 'Password reset link', htmlContent);

}


export const AuthServices = {
    userLogin,
    forgetUserPassword
}