/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TCustomer } from './customer.interface';
import httpStatus from 'http-status';
import { Customer } from './customer.model';
import { TShippingAddress } from '../../global/interface';

const updateCustomerProfileIntoDB = async (
  customerID: string,
  payload: Partial<TCustomer>,
) => {
  // Check the user is exists
  const isUserExists = await User.findOne({ id: customerID }).select(
    '-password',
  );
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found !');
  }

  // Check the user is delete
  const isUserDelete = isUserExists?.isDelete;
  if (isUserDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is alreday delete !');
  }

  // Check the user is active
  const isUserBanned = isUserExists?.status;
  if (isUserBanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is alreday banned !');
  }

  // Check the custoner is exist
  const isCustomerExists = await Customer.findOne({ customerId: customerID });
  if (!isCustomerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer is not found !');
  }

  // Check the customer is delete
  const isCustomerDelete = isCustomerExists?.isDeleted;
  if (isCustomerDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'Customer is alreday delete !');
  }

  const upddatedData = await Customer.findOneAndUpdate(
    { customerId: customerID },
    payload,
    { new: true },
  );

  return upddatedData;
};

const addShippingAddressIntoDB = async (
  customerID: string,
  shippingAddress: TShippingAddress,
) => {
  // Check the user is exists
  const isUserExists = await User.findOne({ id: customerID }).select(
    '-password',
  );
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found !');
  }

  // Check the user is delete
  const isUserDelete = isUserExists?.isDelete;
  if (isUserDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is alreday delete !');
  }

  // Check the user is active
  const isUserBanned = isUserExists?.status;
  if (isUserBanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is alreday banned !');
  }

  // Check the custoner is exist
  const isCustomerExists = await Customer.findOne({ customerId: customerID });
  if (!isCustomerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer is not found !');
  }

  // Check the customer is delete
  const isCustomerDelete = isCustomerExists?.isDeleted;
  if (isCustomerDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'Customer is alreday delete !');
  }

  // Add shipping address
  const data = await Customer.findOneAndUpdate(
    { customerId: customerID },
    { $push: { shippingAddress: shippingAddress } },
    { new: true },
  );

  return data;
};

const updateShippingAddressIntoDB = async (
  customerID: string,
  addressId: string,
  updatedShippingAddress: Partial<TShippingAddress>,
) => {
  // Check the user is exists
  const isUserExists = await User.findOne({ id: customerID }).select(
    '-password',
  );
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found !');
  }

  // Check the user is delete
  const isUserDelete = isUserExists?.isDelete;
  if (isUserDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is alreday delete !');
  }

  // Check the user is active
  const isUserBanned = isUserExists?.status;
  if (isUserBanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is alreday banned !');
  }

  // Check the custoner is exist
  const isCustomerExists = await Customer.findOne({ customerId: customerID });
  if (!isCustomerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer is not found !');
  }

  // Check the customer is delete
  const isCustomerDelete = isCustomerExists?.isDeleted;
  if (isCustomerDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'Customer is alreday delete !');
  }

  const updatedShippingAddressObject: Record<string, any> = {};

  for (const key of Object.keys(
    updatedShippingAddress,
  ) as (keyof TShippingAddress)[]) {
    updatedShippingAddressObject[`shippingAddress.$[elem].${key}`] =
      updatedShippingAddress[key];
  }

  const updatedData = await Customer.findOneAndUpdate(
    { customerId: customerID },
    { $set: updatedShippingAddressObject },
    { arrayFilters: [{ 'elem._id': addressId }], new: true },
  );

  return updatedData;
};

const deleteShippingAddressFromDB = async (
  customerID: string,
  addressId: string
) => {
  // Check the user is exists
  const isUserExists = await User.findOne({ id: customerID }).select(
    '-password',
  );
  if (!isUserExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'User is not found !');
  }

  // Check the user is delete
  const isUserDelete = isUserExists?.isDelete;
  if (isUserDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is alreday delete !');
  }

  // Check the user is active
  const isUserBanned = isUserExists?.status;
  if (isUserBanned === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is alreday banned !');
  }

  // Check the custoner is exist
  const isCustomerExists = await Customer.findOne({ customerId: customerID });
  if (!isCustomerExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Customer is not found !');
  }

  // Check the customer is delete
  const isCustomerDelete = isCustomerExists?.isDeleted;
  if (isCustomerDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'Customer is alreday delete !');
  }

  // Delete shipping address
  const deletedData = await Customer.findOneAndUpdate({customerId: customerID}, {$pull: {shippingAddress: {_id: addressId}}}, {new: true});
  
  return deletedData
};

export const CustomerServices = {
  updateCustomerProfileIntoDB,
  addShippingAddressIntoDB,
  updateShippingAddressIntoDB,
  deleteShippingAddressFromDB
};
