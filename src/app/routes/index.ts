import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.router";
import { UserRoutes } from "../modules/user/user.router";
import { CustomerRoutes } from "../modules/customer/customer.router";
import { ProductRouter } from "../modules/product/product.router";

const router = Router();

const moduleRroutes = [
    {
        path: '/auth',
        router: AuthRoutes
    },
    {
        path: '/users',
        router: UserRoutes
    },
    {
        path: '/customer',
        router: CustomerRoutes
    },
    {
        path: '/products',
        router: ProductRouter
    },
];

moduleRroutes.forEach((route) => router.use(route.path, route.router));

export default router;