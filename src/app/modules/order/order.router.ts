import express from 'express';
import { OrderController } from './order.controller';

const router = express.Router();

// Order with COD
router.post('/cash-on-delivery', OrderController.createOrderOnCOD);

export const OrdersRoutes = router;