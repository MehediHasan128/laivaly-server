import config from '../../config';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { AuthServices } from './auth.services';

const isProduction = config.node_env === 'production';

const loginUser = catchAsync(async (req, res) => {
  const data = await AuthServices.userLogin(req.body);

  const { accessToken, refreshToken } = data;

  //   Set refresh token in cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24,
  });
  
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});

const logoutUser = catchAsync(async (req, res) => {
  //   Remove token from cookie
  res.cookie('accessToken', null, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'none',
    maxAge: 0,
  });

  res.cookie('refreshToken', null, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'none',
    maxAge: 0,
  });

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'User logout succesfully!',
    data: null,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const data = await AuthServices.forgetUserPassword(req.body.userEmail);

  const { resetToken } = data;

  res.cookie('passwordResetToken', resetToken, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 1000 * 60 * 5,
  });

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message:
      'A password reset link has been sent to your email. Please check your inbox.',
    data: { resetToken },
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const data = await AuthServices.resetUserPassword(
    req.body,
    req.cookies.passwordResetToken as string,
  );

  res.clearCookie('passwordResetToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Your password reset succesfully!',
    data: data,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const data = await AuthServices.changeUserPassword(req.user, req.body);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Your password update succesfully!',
    data: data,
  });
});

const emailVarification = catchAsync(async (req, res) => {
  await AuthServices.verifyEmail(req.params.userEmail, req.body.otp);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message:
      'Your profile has been successfully verified. You can now log in to your Laivaly account.',
    data: null,
  });
});

const resendOTPEmail = catchAsync(async (req, res) => {
  const data = await AuthServices.resendOTPEmailVaerification(
    req.params.userEmail,
  );

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message:
      'A new OTP has been sent to your email. Please check your inbox or spam folder.',
    data: data,
  });
});

const refreshAccessToken = catchAsync(async (req, res) => {
  const data = await AuthServices.refreshAccessToken(req.cookies.refreshToken);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: data,
  });
});

export const AuthController = {
  loginUser,
  logoutUser,
  forgetPassword,
  resetPassword,
  changePassword,
  emailVarification,
  resendOTPEmail,
  refreshAccessToken,
};
