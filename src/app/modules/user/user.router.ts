import express from 'express';
import { UserController } from './user.controller';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { CustomerValidation } from '../customer/customer.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.contant';
import { upload } from '../../utils/sendImageToCloudinary';
import { StaffValidation } from '../staff/staff.validation';

const router = express.Router();

// Create customer account
router.post(
  '/create-customer',
  validationRequest(CustomerValidation.createCustomerValidationSchema),
  UserController.createCustomer,
);
// Create staff account
router.post(
  '/create-staff',
  validationRequest(StaffValidation.createStaffValidationSchema),
  UserController.createStaff,
);
// Get user profile
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.staff, USER_ROLE.customer),
  UserController.getMe,
);
// Add user profile picture
router.post(
  '/add-profile-picture/:userId',
  upload.single('file'),
  auth(USER_ROLE.admin, USER_ROLE.staff, USER_ROLE.customer),
  UserController.addProfilePicture
);

export const UserRoutes = router;
