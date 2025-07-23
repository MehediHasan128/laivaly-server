import express from 'express';
import { WishlistController } from './wishlist.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';

const router = express.Router();

// Add product into wishlist
router.patch(
  '/add-product/:userId',
  auth(USER_ROLE.customer),
  WishlistController.addProductInWishlist,
);
// Remove product from wishlist
router.patch(
  '/remove-product/:userId',
//   auth(USER_ROLE.customer),
  WishlistController.removeProductFromWishlist,
);

export const WishlistRouter = router;
