import express from 'express';
import { WishlistController } from './wishlist.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';

const router = express.Router();

// Add product into wishlist
router.post('/add-product/:userId', auth(USER_ROLE.customer), WishlistController.addProductInWishlist)

export const WishlistRouter = router;