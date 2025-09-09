import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { ProductServices } from './product.services';

const addProduct = catchAsync(async (req, res) => {
  const data = await ProductServices.addProductIntoDB(req.files, req.body);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully add product!',
    data: data,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const data = await ProductServices.updateProductIntoDB(
    req.params.parentProductId,
    req.body,
  );

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Product update successfully!',
    data: data,
  });
});

const getAllProduct = catchAsync(async (req, res) => {
  const data = await ProductServices.getAllProductFromDB(req.query);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'All products retrieved successfully!',
    data: data,
  });
});

const getsingleProduct = catchAsync(async (req, res) => {
  const data = await ProductServices.getSingleProductFromDB(
    req.params.productId,
  );

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: `Product with ID (${req.params.productId}) fetched successfully`,
    data: data,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const data = await ProductServices.deleteSingleProductIntoDB(
    req.params.productId,
  );

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Product has been moved to trash',
    data: data,
  });
});

export const ProductController = {
  addProduct,
  updateProduct,
  getAllProduct,
  getsingleProduct,
  deleteProduct,
};
