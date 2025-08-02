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
// Get all orders
router.get('/', auth(USER_ROLE.admin), OrderController.getAllOrders);
// Get orders by using userId
router.get(
  '/:userId',
  // auth(USER_ROLE.customer),
  OrderController.getOrdersByUserId,
);
// Get orders by using userId
router.get(
  '/customer-order/:userId',
  // auth(USER_ROLE.staff),
  OrderController.getOrdersForStaff,
);
// Update order status
router.patch(
  '/update-order-status/:orderId',
  // auth(USER_ROLE.staff),
  OrderController.updateOrderStatus,
);

export const OrdersRoutes = router;
