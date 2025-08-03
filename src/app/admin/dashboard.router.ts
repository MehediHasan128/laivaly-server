import express from 'express';
import { AdminDashboardController } from './dashboard.controller';

const router = express.Router();

router.get('/', AdminDashboardController.getAllInformation);

export const DashboardRoutes = router;
