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

export const UserController = {
    createCustomer
}