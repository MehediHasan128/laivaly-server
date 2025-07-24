import express from 'express';
import { CartController } from './cart.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { CartValidation } from './cart.validation';

const router = express.Router();

// Add product into cart
router.patch('/add-product/:userId', auth(USER_ROLE.customer), validationRequest(CartValidation.createCartValidationSChema), CartController.addProductIntoCart);
// Get all product from cart
router.get('/:userId', auth(USER_ROLE.customer), CartController.getALlProductFromCart);

export const CartRoutes = router;
