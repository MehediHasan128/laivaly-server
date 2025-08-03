import { Product } from '../modules/product/product.model';
import { User } from '../modules/user/user.model';
import { calculateTotalSellsAndRevenue, getDateRangeForFilter } from './dashboard.utils';

const getAllInformationFromDB = async () => {
  // Count the total user
  const users = await User.countDocuments({ role: { $ne: 'admin' } });
  // Count the total customer
  const customers = await User.countDocuments({ role: { $eq: 'customer' } });
  // Count the total staff
  const staffs = await User.countDocuments({ role: { $eq: 'staff' } });
  // Count the total product
  const products = await Product.countDocuments();

  return {
    users,
    customers,
    staffs,
    products,
  };
};

const getTotalSellsAndRevenueFromDB = async (rangeType: string, startDate: string) => {
  // Now get the date range
  const dateRange = await getDateRangeForFilter({rangeType, startDate});

  // Now get the total sells and revenue
  const { totalSells, totalRevenue } = await calculateTotalSellsAndRevenue(dateRange);

  return {
    totalSells,
    totalRevenue,
  };
};

export const AdminDashboardServices = {
  getAllInformationFromDB,
  getTotalSellsAndRevenueFromDB,
};
