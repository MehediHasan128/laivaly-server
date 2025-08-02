import express from 'express';
import { OrderController } from './order.controller';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { OrderValidation } from './order.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';

const router = express.Router();

// Order with COD
router.post(
  '/cash-on-delivery',
  auth(USER_ROLE.customer),
  validationRequest(OrderValidation.createOrderValidationSchema),
  OrderController.createOrderOnCOD,
);
// Order with SSLCommerz
router.post(
  '/sslcommerz',
  // auth(USER_ROLE.customer),
  // validationRequest(OrderValidation.createOrderValidationSchema),
  OrderController.createOrderOnSSLCommerz,
);

export const OrdersRoutes = router;
