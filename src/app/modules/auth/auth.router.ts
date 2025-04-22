import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlwares/validationRequest';
import { AuthValidation } from './auth.validation';
import Auth from '../../middlwares/auth';
import { userRole } from '../users/user.constant';

const router = express.Router();

// User login
router.post('/user-signIn', validateRequest(AuthValidation.userSignInValidationSchema), AuthController.userSignIn)
// Change user pass
router.post('/change-password', Auth(userRole.buyer), validateRequest(AuthValidation.changlePasswordValidationSchema), AuthController.changePassword)
// Forget user pass
router.post('/forget-password', validateRequest(AuthValidation.forgetPasswordValidationSchema), AuthController.forgetPassword)
// Reset user pass
router.post('/reset-password', validateRequest(AuthValidation.resetPasswordValidationSchema), AuthController.resetPassword)

export const AuthRouter = router;