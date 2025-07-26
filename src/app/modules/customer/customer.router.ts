import express from 'express';
import { CustomerController } from './customer.controller';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { CustomerValidation } from './customer.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';

const router = express.Router();

// Update Customer profile
router.patch(
  '/update-profile/:customerID',
  auth(USER_ROLE.customer),
  validationRequest(CustomerValidation.updateCustomerProfileValidationSchema),
  CustomerController.updateCustomerProfile,
);
// Add shipping address
router.patch(
  '/add-shipping-address/:customerID',
  auth(USER_ROLE.customer),
  validationRequest(CustomerValidation.addShippingAddressValidationScham),
  CustomerController.addShippingAddress,
);
// Update shipping address
router.patch(
  '/update-shipping-address/:customerID',
  auth(USER_ROLE.customer),
  validationRequest(CustomerValidation.updateShippingAddressValidationScham),
  CustomerController.updatedShippingAddress,
);
// Delete shipping address
router.delete(
  '/delete-shipping-address/:customerID',
  auth(USER_ROLE.customer),
  CustomerController.deleteShippingAddress,
);

export const CustomerRoutes = router;
