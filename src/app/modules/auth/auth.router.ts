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
// Change user pass
router.post('/forget-password', validateRequest(AuthValidation.changlePasswordValidationSchema), AuthController.forgetPassword)

export const AuthRouter = router;