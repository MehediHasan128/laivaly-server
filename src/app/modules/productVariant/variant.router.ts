import express from 'express';
import { VariantController } from './variant.controller';

const router = express.Router();

// Add variant
router.post('/add-product-variant/:productId', VariantController.addProductVariant)

export const VariantRoutes = router;
