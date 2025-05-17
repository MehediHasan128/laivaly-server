import { Router } from "express";
import { UserRouter } from "../modules/users/user.router";
import { BuyerRouter } from "../modules/buyer/buyer.router";
import { AuthRouter } from "../modules/auth/auth.router";
import { ProductRouter } from "../modules/product/product.router";
import { WhislistRouter } from "../modules/whislist/whislist.router";
import { ReviewRouter } from "../modules/productReviews/productReviews.router";
import { CartRouter } from "../modules/cart/cart.router";
import { OrderRouter } from "../modules/order/order.router";

const router = Router();

const modulesRoutes = [
    {
        path: '/auth',
        route: AuthRouter
    },
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: '/buyers',
        route: BuyerRouter
    },
    {
        path: '/products',
        route: ProductRouter
    },
    {
        path: '/whislist',
        route: WhislistRouter
    },
    {
        path: '/reviews',
        route: ReviewRouter
    },
    {
        path: '/carts',
        route: CartRouter
    },
    {
        path: '/orders',
        route: OrderRouter
    },
]

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router