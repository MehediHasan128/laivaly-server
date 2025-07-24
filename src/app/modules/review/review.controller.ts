import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { ReviewServices } from './review.services';

const addReview = catchAsync(async (req, res) => {
  const data = await ReviewServices.addReviewIntoDB(req.params.reviewId, req.files, req.body);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Your review has been submitted successfully.',
    data: data,
  });
});

export const ReviewController = {
  addReview
};
