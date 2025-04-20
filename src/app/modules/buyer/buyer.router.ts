import express from 'express';
import { BuyerController } from './buyer.controller';

const router = express.Router();

// update buyer information
router.patch('/add-buyer-info', BuyerController.addBuyerInfo);

export const BuyerRouter = router;