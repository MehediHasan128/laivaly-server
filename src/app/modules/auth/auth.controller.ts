import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { AuthServices } from './auth.services';

const loginUser = catchAsync(async (req, res) => {
  const data = await AuthServices.userLogin(req.body);

  const { accessToken, refreshToken } = data;

  //   Set refresh token in cookie
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'User is logged in succesfully!',
    data: { accessToken },
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const data = await AuthServices.forgetUserPassword(req.body.userEmail);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Password reset link is generated succesfully!',
    data: data,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const data = await AuthServices.resetUserPassword(req.body, req.headers.authorization as string);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Your password reset succesfully!',
    data: data,
  });
});

const profileVerify = catchAsync(async (req, res) => {
  const data = await AuthServices.verifyEmail(req.body);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Your profile is verified!',
    data: data,
  });
});

export const AuthController = {
  loginUser,
  forgetPassword,
  resetPassword,
  profileVerify
};
