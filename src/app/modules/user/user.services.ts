/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { TCustomer } from '../customer/customer.interface';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateCustomerAndStaffId } from './user.utils';
import httpStatus from 'http-status';
import { Customer } from '../customer/customer.model';
import { sendOTP } from '../../utils/sendOTP';
import { USER_ROLE } from './user.contant';
import { JwtPayload } from 'jsonwebtoken';
import { uploadSingleImageToCloudinary } from '../../utils/sendImageToCloudinary';
import config from '../../config';
import { createToken, TJwtPayload } from '../auth/auth.utils';
import { TStaff } from '../staff/staff.interface';
import { Staff } from '../staff/staff.model';
import { sendStaffEmailPassword } from '../staff/staff.utils';

const createCustomerIntoDB = async (payload: TCustomer, password: string) => {
  // Check the user is already exist
  const isUserExists = await User.findOne({ userEmail: payload.userEmail });
  if (isUserExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'An account with this email already exists.',
    );
  }

  // Create a empty object
  const userData: Partial<TUser> = {};

  // Set user name
  userData.userName = payload.userName;

  // set user email
  userData.userEmail = payload.userEmail;

  // Set user password
  userData.password = password;

  // Set user role
  userData.role = 'customer';

  // Set user status
  userData.status = 'pending';

  // User transaction rollback method to create customer
  const session = await mongoose.startSession();

  try {
    // Start Transaction
    session.startTransaction();

    // Set user unique id
    userData.id = generateCustomerAndStaffId('C');

    // Create user
    const newUser = await User.create([userData], { session });
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }

    // set userId in customer collection
    payload.customerId = newUser[0].id;
    payload.userId = newUser[0]._id;

    // Create customer
    const newCustomer = await Customer.create([payload], { session });
    if (!newCustomer) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create customer.');
    }

    await sendOTP(payload?.userEmail);

    await session.commitTransaction();
    await session.endSession();

    return newCustomer;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createStaffIntoDB = async(payload: TStaff) => {

  // Check the user is already exist
  const isUserExists = await User.findOne({ userEmail: payload.userEmail });
  if (isUserExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'An account with this email already exists.',
    );
  };

  // Create a empty object
  const userData: Partial<TUser> = {};

  // Set user name
  userData.userName = payload.userName;

  // set user email
  userData.userEmail = payload.userEmail;

  // Set user role
  userData.role = 'staff';

  // Set user status
  userData.status = 'active';

  // User transaction rollback method to create customer
  const session = await mongoose.startSession();

  try {
    // Start Transaction
    session.startTransaction();

    const staffId = generateCustomerAndStaffId('S');

    // Set staff unique id
    userData.id = staffId;

    // Create staff password and set password
    const staffPassPreFix = staffId.slice(0, 3);
    const staffPassPostFix = staffId.slice(11);
    const staffPass = `${staffPassPreFix}@${staffPassPostFix}`;

    userData.password = staffPass;

    // Create user
    const newUser = await User.create([userData], { session });
    if (!newUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }

    // set userId in customer collection
    payload.staffId = newUser[0].id;
    payload.userId = newUser[0]._id;

    // Create customer
    const newStaff = await Staff.create([payload], { session });
    if (!newStaff) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create staff.');
    }

    await session.commitTransaction();
    await session.endSession();

    sendStaffEmailPassword(`${payload.userName.firstName} ${payload.userName.lastName}`, payload?.userEmail, staffPass);

    return newStaff;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
}

const getMe = async (user: JwtPayload) => {
  let data = null;

  if (user?.userRole === USER_ROLE.admin) {
    data = await User.findOne({ userEmail: user?.userEmail }).select(
      '-password',
    );
  }
  if (user?.userRole === USER_ROLE.customer) {
    data = await Customer.findOne({ userEmail: user?.userEmail }).populate({
      path: 'userId',
      select: '-password',
    });
  }

  return data;
};

const addUserProfilePicture = async (userId: string, imageFile: any) => {
  // Check the user is exists
  const isUserExists = await User.findById(userId);
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found !');
  }

  // Check the user is delete
  const isUserDelete = isUserExists?.isDelete;
  if (isUserDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is already delete !');
  }

  // Check the user is banned
  const isUserBanned = isUserExists?.status;
  if (isUserBanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is banned !');
  }

  // Get file path and name
  const fileName = isUserExists?.id;
  const filePath = imageFile?.path;

  // Upload image
  const uploadRes = await uploadSingleImageToCloudinary(filePath, fileName);

  // place image url in user profile url
  const updatedUserData = await User.findByIdAndUpdate(
    userId,
    { userProfileURL: uploadRes?.secure_url },
    { new: true },
  ).select('-password');

  // create token
  const jwtPayload = {
    id: updatedUserData?.id,
    userName: updatedUserData?.userName,
    userEmail: updatedUserData?.userEmail,
    userProfileURL: updatedUserData?.userProfileURL,
    userRole: updatedUserData?.role,
  } as TJwtPayload;

  // Create access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken
  }
};

export const UserServices = {
  createCustomerIntoDB,
  createStaffIntoDB,
  getMe,
  addUserProfilePicture,
};
