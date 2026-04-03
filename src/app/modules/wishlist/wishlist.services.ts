import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Wishlist } from './wishlist.model';
import { User } from '../user/user.model';
import { Product } from '../product/product.model';
import { JwtPayload } from 'jsonwebtoken';

const addProductIntoWishlist = async (user: JwtPayload, productId: string) => {
  // Check the user is exist
  const isUserExist = await User.findById(user?.userId).select('-password');
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
    userId: user?.userId,
    productId: productId,
  });
  if (isProductAdded) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This product already added in your wishlist',
    );
  }

  await Wishlist.findOneAndUpdate(
    { userId: user?.userId },
    { $push: { productId: productId } },
  );
};

const addProductIntoWishlistFromLoaclStorage = async (
  user: JwtPayload,
  productIds: string[],
) => {
  // Check the user is exist
  const isUserExist = await User.findById(user?.userId).select('-password');
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

  for (const productId of productIds) {
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
      userId: user?.userId,
      productId: productId,
    });

    if (isProductAdded) {
      continue;
    }

    await Wishlist.findOneAndUpdate(
      { userId: user?.userId },
      { $push: { productId: productId } },
    );
  }
};

const getAllProductFromWishlist = async (user: JwtPayload) => {
  // Check the user is exist
  const isUserExist = await User.findById(user?.userId).select('-password');
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

  const data = await Wishlist.findOne({ userId: user?.userId }).populate({
    path: 'productId',
    select: '_id title productThumbnail',
  });

  return data?.productId || [];
};

const productExistToWishlist = async (user: JwtPayload, productId: string) => {
  // Check the user is exist
  const isUserExist = await User.findById(user?.userId).select('-password');
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

  // Now check the added product is already exist
  const isProductExist = await Wishlist.findOne({
    userId: user?.userId,
    productId: productId,
  });

  if (!isProductExist) {
    return false;
  }

  return true;
};

const removeProductFromWishlist = async (
  user: JwtPayload,
  productId: string,
) => {
  // Check the user is exist
  const isUserExist = await User.findById(user?.userId).select('-password');
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
    userId: user?.userId,
    productId: productId,
  });
  if (!isProductAdded) {
    throw new AppError(
      httpStatus.CONFLICT,
      'This product is not exist in your wishlist',
    );
  }

  // Now remove product from wishlist
  await Wishlist.findOneAndUpdate(
    { userId: user?.userId },
    { $pull: { productId: productId } },
  );
};

export const WishlistServices = {
  addProductIntoWishlist,
  addProductIntoWishlistFromLoaclStorage,
  getAllProductFromWishlist,
  productExistToWishlist,
  removeProductFromWishlist,
};
