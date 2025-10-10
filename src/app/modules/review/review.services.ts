/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { uploadMultipleImage } from '../../utils/sendImageToCloudinary';
import { User } from '../user/user.model';
import { Review as reviewData } from './review.interface';
import { Review } from './review.model';
import { Product } from '../product/product.model';

const addReviewIntoDB = async (
  reviewId: string,
  files: any,
  payload: reviewData,
) => {
  // Check the user is exist
  const isUserExist = await User.findById(payload.userId);
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

  if (files.length) {
    const uploadImages = await uploadMultipleImage(files);
    payload.pictures = uploadImages;
  }

  await Review.findByIdAndUpdate(reviewId, { $push: { reviews: payload } });
};

const getAllReviewOfProductFromDB = async (productId: string) => {
  // Check the product is exist or not
  const isProductExist = await Product.findById(productId);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  // Check the product is delete
  const isProductDelete = isProductExist?.isDeleted;
  if (isProductDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'Product is already delete!');
  }

  const data = await Review.findOne({ productId: productId }).populate({path: 'reviews.userId', select: '-_id userName userProfileURL'});
  return data;
};
export const ReviewServices = {
  addReviewIntoDB,
  getAllReviewOfProductFromDB,
};
