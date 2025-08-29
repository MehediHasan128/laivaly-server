import express from 'express';
import { AuthController } from './auth.controller';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';

const router = express.Router();

// User login
router.post(
  '/login',
  validationRequest(AuthValidation.userLoginValidationSchema),
  AuthController.loginUser,
);
// User logout
router.post(
  '/logout',
  AuthController.logoutUser,
);
// Forget user password
router.post(
  '/forget-password',
  validationRequest(AuthValidation.forgetUserPasswordValidationSchema),
  AuthController.forgetPassword,
);
// Reset user password
router.post(
  '/reset-password',
  validationRequest(AuthValidation.forgetUserPasswordValidationSchema),
  AuthController.resetPassword,
);
// Change user password
router.patch(
  '/change-password',
  auth(USER_ROLE.customer),
  validationRequest(AuthValidation.changePasswordValidationSchema),
  AuthController.changePassword,
);
// Verify profile
router.patch(
  '/email-verify/:userEmail',
  validationRequest(AuthValidation.otpVerificationValidationSchema),
  AuthController.emailVarification,
);
// Resend otp verification email
router.post('/resend-otp/:userEmail', AuthController.resendOTPEmail);
// Refresh access token
router.post(
  '/refresh-token',
  // validationRequest(AuthValidation.refreshTokenValidationScham),
  AuthController.refreshAccessToken
);

export const AuthRoutes = router;
