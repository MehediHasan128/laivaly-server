import express from 'express';
import { AuthController } from './auth.controller';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

// User login api
router.post('/login', validationRequest(AuthValidation.userLoginValidationSchema), AuthController.loginUser);

export const AuthRoutes = router;