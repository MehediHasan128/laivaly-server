import express from 'express';
import { OrderController } from './order.controller';
import { OrderValidation } from './order.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';
import { validationRequest } from '../../middlewares/zodValidationRequest';

const router = express.Router();

// Order with COD
router.post(
  '/cash-on-delivery',
  auth(USER_ROLE.customer),
  validationRequest(OrderValidation.createOrderValidationSchema),
  OrderController.createOrderOnCOD,
);
// // Order with SSLCommerz
// router.post(
//   '/sslcommerz',
//   // auth(USER_ROLE.customer),
//   // validationRequest(OrderValidation.createOrderValidationSchema),
//   OrderController.createOrderOnSSLCommerz,
// );
// // Get all orders
// router.get('/', auth(USER_ROLE.admin), OrderController.getAllOrders);
// // Get orders by using userId
router.get('/my', auth(USER_ROLE.customer), OrderController.getOrdersByUserId);
router.patch(
  '/cancel-order/:orderId',
  auth(USER_ROLE.customer),
  OrderController.cancelOrder,
);
// // Get orders by using userId
// router.get(
//   '/customer-order/:userId',
//   // auth(USER_ROLE.staff),
//   OrderController.getOrdersForStaff,
// );
// // Update order status
// router.patch(
//   '/update-order-status/:orderId',
//   // auth(USER_ROLE.staff),
//   OrderController.updateOrderStatus,
// );
// Single product check out
router.post(
  '/check-out',
  auth(USER_ROLE.customer),
  OrderController.buySingleProduct,
);
router.post(
  '/create',
  auth(USER_ROLE.customer),
  OrderController.storedOrderData,
);

export const OrdersRoutes = router;
