import { Router } from 'express';
import { AuthRoutes } from '../modules/auth/auth.router';
import { UserRoutes } from '../modules/user/user.router';
import { CustomerRoutes } from '../modules/customer/customer.router';
import { ProductRoutes } from '../modules/product/product.router';
import { WishlistRoutes } from '../modules/wishlist/wishlist.router';
import { ReviewRoutes } from '../modules/review/review.router';
import { CartRoutes } from '../modules/cart/cart.router';
import { StaffRoutes } from '../modules/staff/staff.router';
import { OrdersRoutes } from '../modules/order/order.router';
import { DashboardRoutes } from '../admin/dashboard.router';

const router = Router();

const moduleRroutes = [
  {
    path: '/auth',
    router: AuthRoutes,
  },
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/customer',
    router: CustomerRoutes,
  },
  {
    path: '/staff',
    router: StaffRoutes,
  },
  {
    path: '/products',
    router: ProductRoutes,
  },
  {
    path: '/wishlist',
    router: WishlistRoutes,
  },
  {
    path: '/review',
    router: ReviewRoutes,
  },
  {
    path: '/cart',
    router: CartRoutes,
  },
  {
    path: '/order',
    router: OrdersRoutes,
  },
  {
    path: '/admin-dashboard',
    router: DashboardRoutes,
  },
];

moduleRroutes.forEach((route) => router.use(route.path, route.router));

export default router;
