import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.router";
import { UserRoutes } from "../modules/user/user.router";

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
];

moduleRroutes.forEach((route) => router.use(route.path, route.router));

export default router;