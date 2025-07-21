import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { ProductServices } from './product.services';

const addProduct = catchAsync(async (req, res) => {
  const data = await ProductServices.addProductIntoDB(req.files, req.body)

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully add product!',
    data: data,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const data = await ProductServices.getAllProductFromDB(req.query);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'All products retrieved successfully!',
    metaData: data?.meta,
    data: data?.data
  });
});

export const ProductController = {
  addProduct,
  getAllProduct
};
