import { Order } from '../modules/order/order.model';
import { Product } from '../modules/product/product.model';

export const calculateTotalSellsAndRevenue = async () => {
  let totalSells = 0;
  let totalRevenue = 0;

  // Find the paid orders
  const paidOrders = await Order.find({ paymentStatus: 'paid' });

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
    };

    totalSells = totalSells + items.itemsPrice;
  };

  return {
    totalSells,
    totalRevenue
  }
};
