import express from 'express';
import { ReviewController } from './productReviews.controller';

const router = express.Router();

// add review
router.patch('/add-review/:productId', ReviewController.addProductReview);

export const ReviewRouter = router;