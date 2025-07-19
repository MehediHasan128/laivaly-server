import express, { NextFunction, Request, Response } from 'express';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { ProductValidation } from './product.validation';
import { ProductController } from './product.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';

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

export const ProductRouter = router;
