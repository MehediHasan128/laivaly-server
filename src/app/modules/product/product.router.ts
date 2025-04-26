import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlwares/validationRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';
import { upload } from '../../utils/uploadImageToCloudinary';

const router = express.Router();

// Add product
router.post(
  '/add-product',
  upload.array('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(ProductValidation.CreateProductValidationSchema),
  ProductController.addProduct,
);
// Get all product
router.get('/:audiance', ProductController.getAllProduct);

// Get single product
router.get('/product/:productId', ProductController.getSingleProduct);

// Get similer product
router.get('/products/similer-product', ProductController.getSimilerProduct);

export const ProductRouter = router;