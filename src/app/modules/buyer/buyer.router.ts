import express from 'express';
import { BuyerController } from './buyer.controller';
import validateRequest from '../../middlwares/validationRequest';
import { BuyerValidation } from './buyer.validation';
import { upload } from '../../utils/uploadImageToCloudinary';

const router = express.Router();

// update buyer information
router.patch(
  '/update-buyer-info/:buyerId',
  validateRequest(BuyerValidation.updateBuyerValidationSchema),
  BuyerController.addBuyerInfo,
);

router.patch('/update-buyer-image/:buyerId', upload.single('file'), BuyerController.addBuyerProfile)

export const BuyerRouter = router;
