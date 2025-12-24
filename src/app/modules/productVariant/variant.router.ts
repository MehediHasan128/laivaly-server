import express, { NextFunction, Request, Response } from 'express';
import { VariantController } from './variant.controller';
import { upload } from '../../utils/sendImageToCloudinary';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { ProductVariantValidation } from './variant.validation';

const router = express.Router();

// Add variant
router.post(
  '/add-product-variant/:productId',
  upload.array('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
//   auth(USER_ROLE.admin),
  validationRequest(ProductVariantValidation.createProductVariantValidationSchema),
  VariantController.addProductVariant,
);

// Add variant
router.get(
  '/get-product-variant/:variantId',
  VariantController.getProductVariant,
);

export const VariantRoutes = router;
