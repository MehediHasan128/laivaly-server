/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '../modules/order/order.model';
import { Product } from '../modules/product/product.model';

interface IDateRangeQuery {
  rangeType?: string;
  startDate?: string;
  endDate?: string;
}

export interface TTimeRange {
  startDate?: string;
  endDate?: string;
}

export const calculateTotalSellsAndRevenue = async (filter?: TTimeRange) => {
    console.log(filter);
  let totalSells = 0;
  let totalRevenue = 0;

  const dateFilter: any = {};

  if (filter?.startDate || filter?.endDate) {
    dateFilter.createdAt = {};
    if (filter.startDate) dateFilter.createdAt.$gte = new Date(filter.startDate);
    if (filter.endDate) dateFilter.createdAt.$lte = new Date(filter.endDate);
  }

  // Find the paid orders
  const paidOrders = await Order.find({ paymentStatus: 'paid', ...dateFilter });

  console.log(dateFilter);

  for (const items of paidOrders) {
    const productVeriants = items?.orderItems;

    for (const veriant of productVeriants) {
      const quantity = veriant?.quantity;
      const product = await Product.findById(veriant?.productId).select(
        '-_id price perUnitCost discount',
      );

      // Now calculate per unit revenue
      const perUnitRevenue =
        product!.price -
        Number((product!.price * (product!.discount / 100)).toFixed(2)) -
        product!.perUnitCost;

      // Now calculate per product total revenue
      const productTotalRevenue = perUnitRevenue * quantity;

      // Now calculate the total revenue
      totalRevenue = totalRevenue + productTotalRevenue;
    }

    totalSells = totalSells + items.itemsPrice;
  }

  return {
    totalSells,
    totalRevenue,
  };
};

export const getDateRangeForFilter = async ({
  rangeType,
  startDate,
}: IDateRangeQuery) => {
  const today = new Date();

  const result: { startDate?: string; endDate?: string } = {};

  switch (rangeType) {
    case 'currentMonth':
      result.startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
      ).toISOString();
      result.endDate = today.toISOString();
      break;

    case 'last7Days':
      result.startDate = new Date(
        today.getTime() - 7 * 24 * 60 * 60 * 1000,
      ).toISOString();
      result.endDate = today.toISOString();
      break;

    case 'lastMonth':
      result.startDate = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1,
      ).toISOString();
      result.endDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        0,
      ).toISOString();
      break;

    case 'last3Months':
      result.startDate = new Date(
        today.getFullYear(),
        today.getMonth() - 3,
        1,
      ).toISOString();
      result.endDate = today.toISOString();
      break;

    case 'custom':
      if (startDate) {
        const date = new Date(startDate);

        const start = new Date(date);
        start.setHours(0,0,0,0)

        const end = new Date(date);
        end.setHours(23,59,59,999);

        result.startDate = start.toISOString();
        result.endDate = end.toISOString();
      }
      break;

    default:
      break;
  };

  return result;
};
