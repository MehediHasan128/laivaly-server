import express, { NextFunction, Request, Response } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.contant';
import { ReviewController } from './review.controller';
import { validationRequest } from '../../middlewares/zodValidationRequest';
import { ReviewValidation } from './review.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

// Add review
router.patch(
  '/add-review/:reviewId',
    auth(USER_ROLE.customer),
  upload.array('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(ReviewValidation.addReviewValidationSchema),
  ReviewController.addReview,
);

export const ReviewRouter = router;
