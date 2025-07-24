/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { uploadMultipleImage } from '../../utils/sendImageToCloudinary';
import { User } from '../user/user.model';
import { Review as reviewData } from './review.interface';
import { Review } from './review.model';

const addReviewIntoDB = async (
  reviewId: string,
  files: any,
  payload: reviewData,
) => {
  // Check the user is exist
  const isUserExist = await User.findById(payload.userId);
  if(!isUserExist){
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found!')
  };

  // Check the user is delete
  const isUserDelete = isUserExist?.isDelete;
  if(isUserDelete){
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete!')
  };

  // Check the user is banned
  const isUserBanned = isUserExist?.status;
  if(isUserBanned === 'banned'){
    throw new AppError(httpStatus.FORBIDDEN, 'User is banned!')
  };

  if (files) {
    const uploadImages = await uploadMultipleImage(files);
    payload.pictures = uploadImages;
  };

  await Review.findByIdAndUpdate(reviewId, {$push: {reviews: payload}})
};

export const ReviewServices = {
  addReviewIntoDB,
};
