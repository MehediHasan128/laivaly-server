import express from 'express';
import validateRequest from '../../middlwares/validationRequest';
import { CartValidation } from './cart.validation';
import { CartController } from './cart.controller';

const router = express.Router();

// Add cart into db
router.post('/create-cart', validateRequest(CartValidation.CartValidationSchema), CartController.addCart);
// get all product from cart
router.get('/:userId', CartController.getAllProductFromCart);
// get all product from cart
router.patch('/update-cart-product', CartController.productAddOrRemove);

export const CartRouter = router;