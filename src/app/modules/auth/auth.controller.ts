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

export const AuthController = {
  loginUser,
};
