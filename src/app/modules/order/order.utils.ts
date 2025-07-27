import crypto from 'crypto';
import { Order } from './order.model';

export const genarateOrderId = async () => {
  const now = new Date();

  const randomByte = crypto.randomBytes(2).toString('hex').toUpperCase();

  const dayStart = new Date(now.setHours(0, 0, 0, 0));
  const dayEnd = new Date(now.setHours(23, 59, 59, 999));

  const countTodayOrders = await Order.countDocuments({
    createdAt: { $gte: dayStart, $lte: dayEnd },
  });

  const orderSerial = (countTodayOrders + 1).toString().padStart(4, '0');

  const orderID = `LVO-${randomByte}-${orderSerial}`;

  return orderID;
};
