import express, { NextFunction, Request, Response } from 'express';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { ProductController } from './product.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';
import { ProductValidation } from './product.validation';

const router = express.Router();

// Add product
router.post(
  '/add-product',
  upload.array('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(USER_ROLE.admin),
  validationRequest(ProductValidation.createProductValidationSchema),
  ProductController.addProduct,
);
// Get all product from db
router.get('/', ProductController.getAllProduct);
// Get single product from db
router.get('/:productId', ProductController.getsingleProduct);
// Delete single product from db
router.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  ProductController.deleteProduct,
);

export const ProductRouter = router;
