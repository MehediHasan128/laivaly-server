import express from 'express';
import { UserController } from './user.controller';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { CustomerValidation } from '../customer/customer.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.contant';

const router = express.Router();

// Create customer account
router.post(
  '/create-customer',
  validationRequest(CustomerValidation.createCustomerValidationSchema),
  UserController.createCustomer,
);
// Get user profile
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.staff, USER_ROLE.customer),
  UserController.getMe,
);

export const UserRoutes = router;
