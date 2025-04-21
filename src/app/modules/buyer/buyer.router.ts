import express from 'express';
import { BuyerController } from './buyer.controller';
import validateRequest from '../../middlwares/validationRequest';
import { BuyerValidation } from './buyer.validation';

const router = express.Router();

// update buyer information
router.patch(
  '/update-buyer-info/:buyerId',
  validateRequest(BuyerValidation.updateBuyerValidationSchema),
  BuyerController.addBuyerInfo,
);

export const BuyerRouter = router;
