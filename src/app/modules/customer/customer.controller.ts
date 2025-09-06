import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { CustomerServices } from './customer.services';

const updateCustomerProfile = catchAsync(async (req, res) => {

  const data = await CustomerServices.updateCustomerProfileIntoDB(req.params.customerID, req.body);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully update your profile!',
    data: data,
  });
});

const addShippingAddress = catchAsync(async (req, res) => {

  const data = await CustomerServices.addShippingAddressIntoDB(req.params.customerID, req.body.shippingAddress);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully a new shipping address!',
    data: data,
  });
});

const getShippingAddress = catchAsync(async (req, res) => {

  const data = await CustomerServices.getShippingAddressFromDB(req.params.customerID);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully retrive shipping address!',
    data: data,
  });
});

const updatedShippingAddress = catchAsync(async (req, res) => {
  const data = await CustomerServices.updateShippingAddressIntoDB(req.params.customerID, req.query.addressId as string, req.body.shippingAddress);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully update your shipping address!',
    data: data,
  });
});

const deleteShippingAddress = catchAsync(async (req, res) => {
  const data = await CustomerServices.deleteShippingAddressFromDB(req.params.customerID, req.query.addressId as string);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully delete your shipping address!',
    data: data,
  });
});

const changeDefaultAddress = catchAsync(async (req, res) => {
  const data = await CustomerServices.changeDefaultAddressIntoDB(req.params.customerID, req.query.addressId as string);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'This address is now set as your default shipping address.',
    data: data,
  });
});

export const CustomerController = {
  updateCustomerProfile,
  addShippingAddress,
  getShippingAddress,
  updatedShippingAddress,
  deleteShippingAddress,
  changeDefaultAddress
};
