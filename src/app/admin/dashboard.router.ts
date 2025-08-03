import express from 'express';
import { AdminDashboardController } from './dashboard.controller';

const router = express.Router();

router.get('/', AdminDashboardController.getAllInformation);
router.get('/total-sells-revenue', AdminDashboardController.getTotalSellsAndRevenue);

export const DashboardRoutes = router;
