import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { StaffServices } from './staff.services';

const addReview = catchAsync(async (req, res) => {
  const data = await StaffServices.addReviewIntoDB();

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Your review has been submitted successfully.',
    data: data,
  });
});

export const StaffController = {
  addReview
};
