import express from 'express';
import { UserController } from './user.controller';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { customerValidation } from '../customer/customer.validation';

const router = express.Router();

// Create customer account
router.post('/create-customer', validationRequest(customerValidation.createCustomerValidationSchema), UserController.createCustomer)

export const UserRoutes = router;