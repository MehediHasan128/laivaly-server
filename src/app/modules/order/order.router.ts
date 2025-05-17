import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

router.post('/create-stripe-checkout-session', OrderController.handleCreateCheckoutSession);

export const OrderRouter = router;