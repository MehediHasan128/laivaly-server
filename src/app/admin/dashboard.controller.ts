import { catchAsync } from "../utils/catchAsync";
import { sendResponce } from "../utils/sendResponce";
import { AdminDashboardServices } from "./dashboard.services";

const getAllInformation = catchAsync(async (req, res) => {
  const data = await AdminDashboardServices.getAllInformationFromDB();

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully retrive some important information.',
    data: data,
  });
});

export const AdminDashboardController = {
  getAllInformation
};
