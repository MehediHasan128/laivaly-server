import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TResetData, TUserLogin } from './auth.interface';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../config';
import { createToken } from './auth.utils';
import path from 'path';
import fs from 'fs';
import sendEmail from '../../utils/sendEmail';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { redis } from '../../lib/redis';
import { sendOTP } from '../../utils/sendOTP';

const userLogin = async (payload: TUserLogin) => {
  // Check the user is exist or not
  const isUserExist = await User.findOne({ userEmail: payload.userEmail });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
  }

  // Check the user is delete or not
  const isUserDeleted = isUserExist.isDelete;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete !!');
  }

  // Check the user is banned
  const isUserbanned = isUserExist.status;
  if (isUserbanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already banned !!');
  }

  // Check the user password is correct
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    isUserExist?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Incorrect password !!');
  }

  // create token
  const jwtPayload = {
    id: isUserExist?.id,
    userName: isUserExist?.userName,
    userEmail: isUserExist?.userEmail,
    userProfileURL: isUserExist?.userProfileURL,
    userRole: isUserExist?.role,
  };

  // Create access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // Create refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const forgetUserPassword = async (userEmail: string) => {
  // Check the user is exist or not
  const isUserExist = await User.findOne({ userEmail: userEmail });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
  }

  // Check the user is delete or not
  const isUserDeleted = isUserExist.isDelete;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete !!');
  }

  // Check the user is banned
  const isUserbanned = isUserExist.status;
  if (isUserbanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already banned !!');
  }

  // create token
  const jwtPayload = {
    id: isUserExist?.id,
    userName: isUserExist?.userName,
    userEmail: isUserExist?.userEmail,
    userProfileURL: isUserExist?.userProfileURL,
    userRole: isUserExist?.role,
  };

  // Create reset token for 5 min
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '300',
  );

  // Createe password rest ui link
  const resetPasswordUILink = `${config.reset_password_ui_link}?userEmail=${isUserExist.userEmail}&token=${resetToken}`;

  // Get password reset ui hyml file
  const resetEmailUiHTMLFile = path.join(
    process.cwd(),
    'src/app/templates/pass_reset_email.html',
  );

  // Get the html content
  let htmlContent = fs.readFileSync(resetEmailUiHTMLFile, 'utf8');

  // Get the userName
  const userName = `${isUserExist?.userName.firstName} ${isUserExist?.userName.lastName}`;

  // Now replace the html content
  htmlContent = htmlContent
    .replace("[User's Name]", userName)
    .replace('{{RESET_LINK}}', resetPasswordUILink);

  // Send email with password reset link
  await sendEmail(isUserExist?.userEmail, 'Password reset link', htmlContent);

  return resetToken;
};

const resetUserPassword = async (payload: TResetData, resetToken: string) => {
  // Check the user is exist or not
  const isUserExist = await User.findOne({ userEmail: payload.userEmail });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
  }

  // Check the user is delete or not
  const isUserDeleted = isUserExist.isDelete;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete !!');
  }

  // Check the user is banned
  const isUserbanned = isUserExist.status;
  if (isUserbanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already banned !!');
  }

  // Decoded reset token
  const decoded = jwt.verify(
    resetToken,
    config.jwt_access_secret as string,
  ) as JwtPayload;
  if (payload.userEmail !== decoded.userEmail) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
  }

  // Hash new password
  const newHashPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  // Update new password
  await User.findOneAndUpdate(
    { userEmail: decoded.userEmail, role: decoded.userRole },
    { password: newHashPassword },
  );
};

const verifyEmail = async (userEmail: string, otp: string) => {
  // Check the user is exist or not
  const isUserExist = await User.findOne({ userEmail: userEmail });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
  }

  // Check the user is delete or not
  const isUserDeleted = isUserExist.isDelete;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete !!');
  }

  // Check the user is banned
  const isUserbanned = isUserExist.status;
  if (isUserbanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already banned !!');
  }

  //  Get OTP from Redis
  const storedOTP = await redis.get(`otp-${userEmail}`);
  if (storedOTP === null) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Your OTP has expired. Please request a new one.',
    );
  }
  if (storedOTP !== otp) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'The OTP you entered is incorrect. Please try again.',
    );
  }

  // If otp is correct the upadte the customer status
  const isUserStatusUpdate = await User.findOneAndUpdate(
    { userEmail: userEmail },
    { status: 'active' },
    {new: true}
  );

  if(isUserStatusUpdate){
    await redis.del(`otp-${userEmail}`);
  }
};

const resendOTPEmailVaerification = async (userEmail: string) => {

  // Check the user is exist or not
  const isUserExist = await User.findOne({ userEmail: userEmail });
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
  }

  // Check the user is delete or not
  const isUserDeleted = isUserExist.isDelete;
  if (isUserDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete !!');
  }

  // Check the user is banned
  const isUserbanned = isUserExist.status;
  if (isUserbanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already banned !!');
  }

  await sendOTP(userEmail);

}

export const AuthServices = {
  userLogin,
  forgetUserPassword,
  resetUserPassword,
  verifyEmail,
  resendOTPEmailVaerification
};
