import express from 'express';
import { CustomerController } from './customer.controller';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { customerValidation } from './customer.validation';

const router = express.Router();

// Update Customer profile
router.patch('/update-profile/:customerID', validationRequest(customerValidation.updateCustomerProfileValidationSchema), CustomerController.updateCustomerProfile);

export const CustomerRoutes = router;