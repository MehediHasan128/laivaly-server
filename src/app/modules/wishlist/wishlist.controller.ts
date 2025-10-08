import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { WishlistServices } from './wishlist.services';

const addProductInWishlist = catchAsync(async (req, res) => {
  const data = await WishlistServices.addProductIntoWishlist(
    req.user,
    req.params.productId,
  );

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Product has been added to your wishlist.',
    data: data,
  });
});

const getAllProductFromWishlist = catchAsync(async (req, res) => {
  const data = await WishlistServices.getAllProductFromWishlist(
    req.user,
  );

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: data,
  });
});

const productExistToWishlist = catchAsync(async (req, res) => {
  const data = await WishlistServices.productExistToWishlist(
    req.user,
    req.params.productId,
  );

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: '',
    data: data,
  });
});

const removeProductFromWishlist = catchAsync(async (req, res) => {
  const data = await WishlistServices.removeProductFromWishlist(
    req.user,
    req.params.productId,
  );

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Product has been removed from your wishlist.',
    data: data,
  });
});

export const WishlistController = {
  addProductInWishlist,
  getAllProductFromWishlist,
  productExistToWishlist,
  removeProductFromWishlist,
};
