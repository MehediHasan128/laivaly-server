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

const createCustomerIntoDB = async (payload: TCustomer, password: string) => {
  // // Check the user is already exist
  // const isUserExists = await User.findOne({ userEmail: payload.userEmail });
  // if (isUserExists) {
  //   throw new AppError(
  //     httpStatus.CONFLICT,
  //     'An account with this email already exists.',
  //   );
  // }

  // // Create a empty object
  // const userData: Partial<TUser> = {};

  // // Set user name
  // userData.userName = payload.userName;

  // // set user email
  // userData.userEmail = payload.userEmail;

  // // Set user password
  // userData.password = password;

  // // Set user role
  // userData.role = 'customer';

  // // Set user status
  // userData.status = 'pending';

  // // User transaction rollback method to create customer
  // const session = await mongoose.startSession();

  // try {
  //   // Start Transaction
  //   session.startTransaction();

  //   // Set user unique id
  //   userData.id = generateCustomerAndStaffId('C');

  //   // Create user
  //   const newUser = await User.create([userData], { session });
  //   if (!newUser) {
  //     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
  //   }

  //   // set userId in customer collection
  //   payload.customerId = newUser[0].id;
  //   payload.userId = newUser[0]._id;

  //   // Create customer
  //   const newCustomer = await Customer.create([payload], { session });
  //   if (!newCustomer) {
  //     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create customer.');
  //   }

  //   await sendOTP(payload?.userEmail);

  //   await session.commitTransaction();
  //   await session.endSession();

  //   return newCustomer;
  // } catch (err: any) {
  //   await session.abortTransaction();
  //   await session.endSession();
  //   throw new Error(err);
  // }

  await sendOTP(payload?.userEmail);
};

export const UserServices = {
  createCustomerIntoDB
};
