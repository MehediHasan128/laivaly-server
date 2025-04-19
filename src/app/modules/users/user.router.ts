import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlwares/validationRequest';
import { BuyerValidation } from '../buyer/buyer.validation';

const router = express.Router();

// Create user
router.post('/create-user', validateRequest(BuyerValidation.createBuyerValidationSchema), UserController.createUser);

export const UserRouter = router;