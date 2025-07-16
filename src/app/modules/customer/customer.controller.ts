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

export const CustomerController = {
  updateCustomerProfile,
  addShippingAddress
};
