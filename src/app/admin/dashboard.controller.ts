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


const getTotalSellsAndRevenue = catchAsync(async (req, res) => {

  const {rangeType, startDate} = req.query;

  const data = await AdminDashboardServices.getTotalSellsAndRevenueFromDB(rangeType as string, startDate as string);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully retrive the total sells and revenue.',
    data: data,
  });
});

const getCustomerDetails = catchAsync(async (req, res) => {

  const data = await AdminDashboardServices.getCustomerDetailsFromDB(
    req.params.userId,
  );

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: data,
  });
});

export const AdminDashboardController = {
  getAllInformation,
  getTotalSellsAndRevenue,
  getCustomerDetails,
};
