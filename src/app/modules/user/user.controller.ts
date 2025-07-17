import { catchAsync } from "../../utils/catchAsync";
import { sendResponce } from "../../utils/sendResponce";
import { UserServices } from "./user.services";

const createCustomer = catchAsync(async (req, res) => {

    const {password, customer} = req.body;

  const data = await UserServices.createCustomerIntoDB(customer, password);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Welcome to Laivaly! Your account has been created successfully.',
    data: data,
  });
});

const getMe = catchAsync(async (req, res) => {

  const data = await UserServices.getMe(req.user);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'User is retrieved succesfully.',
    data: data,
  });
});

const addProfilePicture = catchAsync(async (req, res) => {

  const data = await UserServices.addUserProfilePicture(req.params.userId, req.file);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Succesfully add your profile picture !',
    data: data,
  });
});

export const UserController = {
    createCustomer,
    getMe,
    addProfilePicture
}