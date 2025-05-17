import AppError from "../../errors/AppError";
import { stripe } from "../../utils/stripe";
import { Product } from "../product/product.model"
import { TOrder } from "./order.interface"
import httpStatus from 'http-status';
import { Order } from "./order.model";

const createStripeCheckoutSession = async (orderData: TOrder) => {

    const lineItems = await Promise.all(
        orderData.products.map(async (item) => {
          const product = await Product.findById(item.productId);
          if (!product) {
            throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
          }
    
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: product.title,
                metadata: {
                  color: item.color,
                  size: item.size,
                },
              },
              unit_amount: Math.round((product.price || 0) * 100),
            },
            quantity: item.quantity,
          };
        })
      );

    const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: 'http://localhost:5173/profile/my-orders',
    cancel_url: 'http://localhost:5173/cart',
  });

  await Order.create({
    ...orderData,
    paymentMethod: 'Stripe',
    paymentStatus: 'unpaid',
    status: 'pending',
    orderDate: new Date(),
  });

  return session.url;
}

export const OrderServices = {
    createStripeCheckoutSession
}