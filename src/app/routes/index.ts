import { Router } from "express";
import { UserRouter } from "../modules/users/user.router";
import { BuyerRouter } from "../modules/buyer/buyer.router";

const router = Router();

const modulesRoutes = [
    {
        path: '/users',
        route: UserRouter
    },
    {
        path: '/buyers',
        route: BuyerRouter
    },
]

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router