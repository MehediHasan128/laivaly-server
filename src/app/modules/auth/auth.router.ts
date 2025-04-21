import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../../middlwares/validationRequest';
import { AuthValidation } from './auth.validation';

const router = express.Router();

// User login
router.post('/user-signIn', validateRequest(AuthValidation.userSignInValidationSchema), AuthController.userSignIn)

export const AuthRouter = router;