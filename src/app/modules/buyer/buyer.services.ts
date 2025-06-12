/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from 'mongoose';
import AppError from '../../errors/AppError';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';
import { User } from '../users/user.model';
import { TBuyer } from './buyer.interface';
import { Buyer } from './buyer.model';
import httpStatus from 'http-status';
import { TShippingAddress } from '../../global/interface';

const addBuyerInfoIntoDB = async (userId: string, payload: Partial<TBuyer>) => {
  // check the user is exist or not
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  // Check the user is user is delete or not
  const isUserDelete = isUserExist?.isDeleted;

  if (isUserDelete) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already deleted!');
  }

  const res = await Buyer.findOneAndUpdate({ userId }, payload, { new: true });

  return res;
};

const getBuyerInformationFromDB = async (userId: string) => {
  // Check the user is exist or not
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const data = await Buyer.findOne({ userId });

  return data;
};

const addBuyerProfilePictureIntoDB = async (userId: string, imageFile: any) => {
  // Check the user is exist or not
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check the user is delete or not
  const isUserDelete = isUserExists?.isDeleted;
  if (isUserDelete) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already deleted!');
  }

  // Get the image name and path
  const imageName = isUserExists?.id;
  const imagePath = imageFile.path;

  // Add or update buyer profile image with transaction and rollback
  const session = await startSession();

  try {
    session.startTransaction();

    const imageFile = [
      {
        imagePath,
        imageName,
      },
    ];

    // Upload image and get the url
    const uploadImage = await uploadImageToCloudinary(imageFile);

    if (!uploadImage) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to upload image!');
    }

    const imageURL = uploadImage[0]?.secure_url;

    // update image in user collection
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageURL },
      { session },
    );

    if (!updateUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to upload photo in user collection!',
      );
    }

    // update image in buyer collection
    const updateBuyer = await Buyer.findOneAndUpdate(
      { userId: userId },
      { profileImage: imageURL },
      { new: true, session },
    );

    if (!updateBuyer) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to upload photo in buyer collection!',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return updateBuyer;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    console.log(err);
  }
};

const addShippingAddressIntoDB = async (
  userId: string,
  newShippingAddress: Pick<TBuyer, 'shippingAddress'>,
) => {
  // Check the user is exist or not
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check the user is delete or not
  const userDeleted = isUserExists.isDeleted;
  if (userDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted!');
  }

  // Check the buter is exist or not
  const isBuyerExists = await Buyer.findOne({ userId });
  if (!isBuyerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Buyer not found!');
  }

  const addShippingAddress = await Buyer.findOneAndUpdate(
    { userId },
    { $push: { shippingAddress: newShippingAddress } },
    { new: true },
  );

  return addShippingAddress;
};

const updateShippingAddressIntoDB = async (
  userId: string,
  addressId: string,
  updatedShippingAddress: Partial<TShippingAddress>,
) => {
  // Check the user is exist or not
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check the user is delete or not
  const userDeleted = isUserExists.isDeleted;
  if (userDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted!');
  }

  // Check the buyer is exist or not
  const isBuyerExists = await Buyer.findOne({ userId });
  if (!isBuyerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Buyer not found!');
  }

  const updateObject: Record<string, any> = {};
  for (const key of Object.keys(
    updatedShippingAddress,
  ) as (keyof TShippingAddress)[]) {
    updateObject[`shippingAddress.$[elem].${key}`] =
      updatedShippingAddress[key];
  }

  const shippingAddressUpdated = await Buyer.findOneAndUpdate(
    { userId },
    { $set: updateObject },
    { arrayFilters: [{ 'elem._id': addressId }], new: true },
  );
  return shippingAddressUpdated;
};

const deleteShippingAddressFromDB = async (
  userId: string,
  addressId: string,
) => {
  // Check the user is exist or not
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check the user is delete or not
  const userDeleted = isUserExists.isDeleted;
  if (userDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already deleted!');
  }

  // Check the buyer is exist or not
  const isBuyerExists = await Buyer.findOne({ userId });
  if (!isBuyerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Buyer not found!');
  }

  const result = await Buyer.findOneAndUpdate(
    { userId },
    { $pull: { shippingAddress: { _id: addressId } } },
    { new: true },
  );

  return result;
};

export const BuyerServices = {
  addBuyerInfoIntoDB,
  addShippingAddressIntoDB,
  addBuyerProfilePictureIntoDB,
  getBuyerInformationFromDB,
  updateShippingAddressIntoDB,
  deleteShippingAddressFromDB,
};
