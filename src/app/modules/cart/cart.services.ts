import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { TCartItem } from './cart.interface';
import httpStatus from 'http-status';
import { Cart } from './cart.model';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import { Variant } from '../productVariant/variant.model';

const addProductIntoCart = async (user: JwtPayload, payload: TCartItem) => {
  // Check the user is exist or not
  const userId = user?.userId;
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check the user is delete
  const isUserDelete = isUserExist?.isDelete;
  if (isUserDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'User already delete!');
  }

  // Check the user is banned
  const userStatus = isUserExist?.status;
  if (userStatus === 'banned') {
    throw new AppError(httpStatus.FORBIDDEN, 'User already banned!');
  }

  // Now check the product is exist
  const isProductExist = await Product.findById(payload?.productId);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  // Check the product is dele
  const isProductDelete = isProductExist?.isDeleted;
  if (isProductDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'Product already delete!');
  }

  // Check the product is already added
  const isProductExistToCart = await Cart.findOne({
    userId,
    'items.selectedVariant.SKU': payload?.selectedVariant.SKU,
  });
  if (isProductExistToCart) {
    throw new AppError(httpStatus.FORBIDDEN, 'This product is already added!');
  }

  // Check the product stock
  const productVariant = await Variant.findOne({
    productId: payload?.productId,
  });
  const allVariants = productVariant?.variants;
  const selectedVariant = allVariants?.find(
    (variant) => variant.SKU === payload?.selectedVariant.SKU,
  );
  if (selectedVariant?.stock === 0) {
    throw new AppError(httpStatus.FORBIDDEN, 'This product is out of stock!');
  }

  // Check the requested quantity is exceeds available stock.
  if (selectedVariant!.stock < payload?.quantity) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `Only ${selectedVariant?.stock} item's available in stock for the selected variant.`,
    );
  }

  // Add product to cart
  const data = await Cart.findOneAndUpdate(
    { userId },
    { $push: { items: payload } },
    { new: true },
  );
  return data;
};

const getAllProductFromCart = async (user: JwtPayload) => {
  // Check the cart is exist
  const isCartExists = await Cart.findOne({ userId: user?.userId });
  if (!isCartExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found for this user.!');
  }

  const data = await Cart.findOne({ userId: user?.userId })
    .select('-_id items')
    .populate({
      path: 'items.productId',
      select: '_id title price discount productFor productImages',
    });
  const items = data?.items;
  return items;
};

const deleteProductFromCart = async (user: JwtPayload, cartId: string) => {
  // Check the cart is exist
  const isCartExists = await Cart.findOne({ userId: user?.userId });
  if (!isCartExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found for this user.!');
  }

  const { items } = isCartExists;

  const isDeletedProductExistsOnCart = items.find(
    (item: TCartItem) => item._id.toString() === cartId,
  );

  if (!isDeletedProductExistsOnCart) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The product you are trying to remove is not in your cart.',
    );
  }

  await Cart.findOneAndUpdate(
    { userId: user?.userId },
    { $pull: { items: { _id: cartId } } },
    { new: true },
  );
};

// const updateProductQuantity = async (
//   userId: string,
//   productId: string,
//   SKU: string,
//   action: string,
// ) => {
//   const isProductExists = await Product.findById(productId).select('variants');
//   if (!isProductExists) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
//   }

//   const veriant = isProductExists?.variants?.find(
//     (veriant) => veriant.SKU === SKU,
//   );
//   const availableStock = veriant?.stock;

//   const cartItems = await Cart.findOne({ userId }).select('items');
//   const cartProductVeriant = cartItems?.items?.find(
//     (item) =>
//       item.productId.toString() === productId &&
//       item.selectedVariant.SKU === SKU,
//   );

//   // Update quantity
//   if (action === 'increase') {
//     if (cartProductVeriant!.quantity === availableStock!) {
//       throw new AppError(httpStatus.CONFLICT, `You cannot add more than ${availableStock} units for this product.`);
//     }
//     cartProductVeriant!.quantity += 1;
//   } else if (action === 'decrease') {
//     if (cartProductVeriant?.quantity == 1) {
//       throw new AppError(httpStatus.NOT_FOUND, 'Quantity cannot be less than 1. To remove this item, please use the delete option.');
//     }
//     cartProductVeriant!.quantity = cartProductVeriant!.quantity - 1;
//   }

//   await cartItems?.save();
// };

export const CartServices = {
  addProductIntoCart,
  getAllProductFromCart,
  deleteProductFromCart,
  //   updateProductQuantity,
};
