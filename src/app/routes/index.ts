import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.router";

const router = Router();

const moduleRroutes = [
    {
        path: '/auth',
        router: AuthRoutes
    }
];

moduleRroutes.forEach((route) => router.use(route.path, route.router));

export default router;