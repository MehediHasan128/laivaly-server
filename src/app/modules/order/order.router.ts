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

// Order with Stripe
router.post(
  '/stripe-payment',
  // auth(USER_ROLE.customer),
  validationRequest(OrderValidation.createOrderValidationSchema),
  OrderController.stripeCheckoutSession,
);

// Order with Klarna
router.post(
  '/klarna-payment',
  auth(USER_ROLE.customer),
  validationRequest(OrderValidation.createOrderValidationSchema),
  OrderController.kalarnaSession,
);

router.post('/klarna-push', OrderController.klarnaPush);

router.get('/my', auth(USER_ROLE.customer), OrderController.getOrdersByUserId);

router.get(
  '/order-history',
  auth(USER_ROLE.customer),
  OrderController.getOrdersHistoryByUserId,
);

router.patch(
  '/cancel-order/:orderId',
  auth(USER_ROLE.customer),
  OrderController.cancelOrder,
);
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
