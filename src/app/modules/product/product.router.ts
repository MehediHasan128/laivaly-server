import express from 'express';
import validateRequest from '../../middlwares/validationRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';


const router = express.Router();

// Add product
router.post('/add-product', validateRequest(ProductValidation.CreateProductValidationSchema), ProductController.addProduct);

export const ProductRouter = router;