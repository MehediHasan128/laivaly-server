import express from 'express';
import { AdminDashboardController } from './dashboard.controller';

const router = express.Router();

router.get('/', AdminDashboardController.getAllInformation);
router.get('/total-sells-revenue', AdminDashboardController.getTotalSellsAndRevenue);
router.get('/:userId', AdminDashboardController.getCustomerDetails);

export const DashboardRoutes = router;
