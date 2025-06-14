import express from 'express';
import { BuyerController } from './buyer.controller';
import validateRequest from '../../middlwares/validationRequest';
import { upload } from '../../utils/uploadImageToCloudinary';
import { ShippingAddressValidation, updateShippingAddressValidation } from '../../global/validation';

const router = express.Router();

// update buyer information
router.patch('/add-buyer-info/:userId', BuyerController.addBuyerInfo);

router.patch('/update-buyer-profile/:userId', upload.single('file'), BuyerController.addBuyerProfile);

// Add shipping address
router.patch('/add-shipping-address/:userId', validateRequest(ShippingAddressValidation), BuyerController.addShippingAddress)

// Add shipping address
router.patch('/update-shipping-address/:userId', validateRequest(updateShippingAddressValidation), BuyerController.updateShippingAddress)

// Delete shipping address
router.delete('/delete-shipping-address/:userId', BuyerController.deleteShippingAddress)

// Get buyer information
router.get('/:userId', BuyerController.getBuyerInformation)

export const BuyerRouter = router;
