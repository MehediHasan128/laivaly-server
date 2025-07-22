import { catchAsync } from '../../utils/catchAsync';
import { sendResponce } from '../../utils/sendResponce';
import { WishlistServices } from './wishlist.services';

const addProductInWishlist = catchAsync(async (req, res) => {
  const data = await WishlistServices.addProductIntoWishlist(req.params.userId, req.query.productId as string);

  sendResponce(res, {
    statusCode: 200,
    success: true,
    message: 'Product has been added to your wishlist.',
    data: data,
  });
});

export const WishlistController = {
  addProductInWishlist,
};
