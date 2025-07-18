import express from 'express';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';

const router = express.Router();

// Add product
router.post('/add-product', validationRequest(ProductValidation.createProductValidationSchema), ProductController.addProduct);

export const ProductRouter = router;