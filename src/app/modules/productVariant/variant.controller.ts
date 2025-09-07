import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';


const addProduct = catchAsync(async (req, res) => {
  const data = await ''

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully add product!',
    data: data,
  });
});

export const VariantController = {
  
};
