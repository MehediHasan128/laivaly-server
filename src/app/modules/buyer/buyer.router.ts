import express from 'express';
import { BuyerController } from './buyer.controller';
import validateRequest from '../../middlwares/validationRequest';
import { BuyerValidation } from './buyer.validation';
import { upload } from '../../utils/uploadImageToCloudinary';
import { ShippingAddressValidation } from '../../global/validation';

const router = express.Router();

// update buyer information
router.patch(
  '/update-buyer-info/:buyerId',
  validateRequest(BuyerValidation.updateBuyerValidationSchema),
  BuyerController.addBuyerInfo,
);

router.patch('/update-buyer-image/:buyerId', upload.single('file'), BuyerController.addBuyerProfile);

// Add shipping address
router.patch('/add-shipping-address/:userId', validateRequest(ShippingAddressValidation), BuyerController.addShippingAddress)

// Get buyer information
router.get('/:userId', BuyerController.getBuyerInformation)

export const BuyerRouter = router;
