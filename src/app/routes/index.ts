import { Router } from "express";

const router = Router();

const moduleRroutes = [
    {
        path: '/',
        router: UserRouter
    }
];

moduleRroutes.forEach((route) => router.use(route.path, route.router));

export default router;