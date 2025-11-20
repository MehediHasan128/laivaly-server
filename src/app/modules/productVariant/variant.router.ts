import express from 'express';
import { VariantController } from './variant.controller';

const router = express.Router();

// Add variant
router.post('/add-product-variant/:productId', VariantController.addProductVariant)

// Add variant
router.get('/get-product-variant/:variantId', VariantController.getProductVariant)

export const VariantRoutes = router;
