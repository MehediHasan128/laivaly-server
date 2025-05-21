/* eslint-disable @typescript-eslint/no-explicit-any */
import { startSession } from 'mongoose';
import AppError from '../../errors/AppError';
import { uploadImageToCloudinary } from '../../utils/uploadImageToCloudinary';
import { User } from '../users/user.model';
import { TBuyer } from './buyer.interface';
import { Buyer } from './buyer.model';
import httpStatus from 'http-status';

const addBuyerInfoIntoDB = async (
  buyerId: string,
  payload: Partial<TBuyer>,
) => {
  // Check the buyer is exist or not
  const isexistsBuyer = await Buyer.findOne({ id: buyerId });

  if (!isexistsBuyer) {
    throw new AppError(httpStatus.NOT_FOUND, 'Buyer not found');
  }

  const data = await Buyer.findOneAndUpdate({ id: buyerId }, payload, {
    new: true,
  });

  return data;
};

const getBuyerInformationFromDB = async(userId: string) => {
  
  // Check the user is exist or not
  const isUserExist = await User.findById(userId);
  if(!isUserExist){
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  };

  const data = await Buyer.findOne({userId});

  return data;

}

const addBuyerProfilePictureIntoDB = async (
  buyerId: string,
  imageFile: any,
) => {
  // Const check the user is exists or not
  const isUserExists = await User.findOne({ id: buyerId });

  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check the user is user is delete or not
  const isUserDelete = isUserExists?.isDeleted;

  if (isUserDelete) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already deleted!');
  }

  // get image name and path
  const imagePath = imageFile.path;
  const imageName = isUserExists?.id;

  // Update buyer profile image
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
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to upload photo!');
    }

    const imageURL = uploadImage[0]?.secure_url;

    // update image in user collection
    const updateUser = await User.findOneAndUpdate(
      { id: buyerId },
      { profileImage: imageURL },
      { new: true, session },
    );

    if (!updateUser) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to upload photo in user collection!',
      );
    }

    // Update image in buyer collection
    const updateBuyer = await Buyer.findOneAndUpdate(
      { id: buyerId },
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
  buyerId: string,
  address: Pick<TBuyer, 'shippingAddress'>,
) => {
  console.log(buyerId, address);
};

export const BuyerServices = {
  addBuyerInfoIntoDB,
  addShippingAddressIntoDB,
  addBuyerProfilePictureIntoDB,
  getBuyerInformationFromDB
};
