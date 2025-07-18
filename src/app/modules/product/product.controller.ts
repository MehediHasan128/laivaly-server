import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { ProductServices } from './product.services';

const addProduct = catchAsync(async (req, res) => {
  const data = await ProductServices.addProductIntoDB(req.body)

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully add product!',
    data: data,
  });
});

export const ProductController = {
  addProduct,
};
