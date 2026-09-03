import { Order } from '../modules/order/order.model';
import { Product } from '../modules/product/product.model';
import { User } from '../modules/user/user.model';
import httpStatus from 'http-status';
import {
  calculateTotalSellsAndRevenue,
  getDateRangeForFilter,
  getTotalRevenue,
} from './dashboard.utils';
import AppError from '../errors/AppError';
import { Customer } from '../modules/customer/customer.model';
import { Types } from 'mongoose';

const getAllInformationFromDB = async () => {
  // Count the total user
  const users = await User.countDocuments({ role: { $ne: 'admin' } });
  // Count the total customer
  const customers = await User.countDocuments({ role: { $eq: 'customer' } });
  // Count the total staff
  const staffs = await User.countDocuments({ role: { $eq: 'staff' } });
  // Count the total product
  const products = await Product.countDocuments();
  // Count the total orders
  const orders = await Order.countDocuments();
  // Calculate the total sales
  const totalSales = await getTotalRevenue();

  return {
    users,
    customers,
    staffs,
    products,
    orders,
    totalSales,
  };
};

const getTotalSellsAndRevenueFromDB = async (
  rangeType: string,
  startDate: string,
) => {
  // Now get the date range
  const dateRange = await getDateRangeForFilter({ rangeType, startDate });

  // Now get the total sells and revenue
  const { totalSells, totalRevenue } =
    await calculateTotalSellsAndRevenue(dateRange);

  return {
    totalSells,
    totalRevenue,
  };
};

const getCustomerDetailsFromDB = async (userId: string) => {
  // const isUserExist = await User.findById(userId).select('-password');
  // if (!isUserExist) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
  // }
  // console.log(isUserExist);

  const customerDetails = await Customer.findOne({ userId }).populate({
    path: 'userId',
    select: '-password -userName -userEmail',
  });
  if (!customerDetails) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found !!');
  }
  const totalOrders = await Order.countDocuments({ userId });
  const orderDetails = await Order.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(userId),
        paymentStatus: 'paid',
      },
    },
    {
      $group: {
        _id: null,
        totalSpent: { $sum: '$grandTotal' },
        averageOrderValue: { $avg: '$grandTotal' },
      },
    },
  ]);
  const lastOrder = await Order.findOne({ userId })
    .sort({ createdAt: -1 })
    .select('-_id createdAt');

  const latestOrders = await Order.find({ userId })
    .sort({ createdAt: -1 })
    .limit(3)
    .select('orderId createdAt paymentMethod orderStatus grandTotal');

  return {
    customerDetails,
    totalOrders,
    totalSpent: (orderDetails.length && orderDetails[0].totalSpent) || 0.0,
    averageOrderValue:
      (orderDetails.length && orderDetails[0].averageOrderValue) || 0.0,
    lastOrder: lastOrder,
    latestOrders,
  };
};



export const AdminDashboardServices = {
  getAllInformationFromDB,
  getTotalSellsAndRevenueFromDB,
  getCustomerDetailsFromDB,
};

// Total Order
// Total Spent
