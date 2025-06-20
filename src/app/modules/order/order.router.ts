import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/create-stripe-checkout-session', OrderController.handleCreateCheckoutSession);
// Cash on delivery
router.post('/cash-on-delivery', OrderController.handleCreateCashOnDelivery);
// Get all order from database
router.get('/', OrderController.getAllOrder);
// Get user orders from database
router.get('/user/:userId', OrderController.getUserOrders);

export const OrderRouter = router;