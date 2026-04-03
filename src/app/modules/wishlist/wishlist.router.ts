import express from 'express';
import { WishlistController } from './wishlist.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';

const router = express.Router();

// Add product into wishlist
router.patch(
  '/add-product/:productId',
  auth(USER_ROLE.customer),
  WishlistController.addProductInWishlist,
);
// Add product into wishlist from local storage
router.patch(
  '/add-product-from-local-storage',
  auth(USER_ROLE.customer),
  WishlistController.addProductInWishlistFromLoaclStorage
);
// Get all product from wishlist
router.get(
  '/',
  auth(USER_ROLE.customer),
  WishlistController.getAllProductFromWishlist,
);
// Add product into wishlist
router.get(
  '/exist-product/:productId',
  auth(USER_ROLE.customer),
  WishlistController.productExistToWishlist,
);
// Remove product from wishlist
router.delete(
  '/remove-product/:productId',
  auth(USER_ROLE.customer),
  WishlistController.removeProductFromWishlist,
);

export const WishlistRoutes = router;
