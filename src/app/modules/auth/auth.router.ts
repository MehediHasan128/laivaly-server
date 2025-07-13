import express from 'express';
import { AuthController } from './auth.controller';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

// User login api
router.post('/login', validationRequest(AuthValidation.userLoginValidationSchema), AuthController.loginUser);
// Forget user password
router.post('/forget-password', validationRequest(AuthValidation.forgetUserPasswordValidationSchema), AuthController.forgetPassword);

export const AuthRoutes = router;