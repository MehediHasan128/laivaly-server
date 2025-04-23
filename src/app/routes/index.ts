import { Router } from "express";
import { UserRouter } from "../modules/users/user.router";
import { BuyerRouter } from "../modules/buyer/buyer.router";
import { AuthRouter } from "../modules/auth/auth.router";
import { ProductRouter } from "../modules/product/product.router";

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
]

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router