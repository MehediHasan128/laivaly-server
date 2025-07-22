import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Wishlist } from './wishlist.model';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';

const addProductIntoWishlist = async (userId: string, productId: string) => {
  // Check the user is exist
  const isUserExist = await User.findById(userId).select('-password');
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
  }

  // Check the user is delete
  const isUserDelete = isUserExist?.isDelete;
  if (isUserDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete!');
  }

  // Check the user is banned
  const isUserBanned = isUserExist?.status;
  if (isUserBanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is banned!');
  }

  // Now check the product is exist
  const isProductExist = await Product.findById(productId);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product is not found!');
  }

  // Check the product is delete
  const isProductDelete = isProductExist?.isDeleted;
  if (isProductDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'Product is already delete!');
  }

  // Now check the added product is already exist
  const isProductAdded = await Wishlist.findOne({
    userId,
    productId: productId,
  });
  if (isProductAdded) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This product already added in your wishlist',
    );
  }

  await Wishlist.findOneAndUpdate(
    { userId },
    { $push: { productId: productId } },
  );
};

export const WishlistServices = {
  addProductIntoWishlist,
};
