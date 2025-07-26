import AppError from '../../errors/AppError';
import { Product } from '../product/product.model';
import { TCartItem } from './cart.interface';
import httpStatus from 'http-status';
import { Cart } from './cart.model';

const addProductIntoCart = async (userId: string, payload: TCartItem) => {
  // Check the product is exist
  const isProductExists = await Product.findById(payload?.productId);
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  // Check the product is delete
  const isProductDelete = isProductExists?.isDeleted;
  if (isProductDelete) {
    throw new AppError(httpStatus.FORBIDDEN, 'Product is already delete!');
  }

  //   Check the product is already added
  const isProductAldreadyAdded = await Cart.findOne({
    userId,
    'items.selectedVariant.SKU': payload?.selectedVariant?.SKU,
  });
  if (isProductAldreadyAdded) {
    throw new AppError(httpStatus.FORBIDDEN, 'This product is already added!');
  }

  // Check product stock
  const productVeriant = isProductExists?.variants?.find(
    (item) =>
      item.SKU === payload?.selectedVariant?.SKU ||
      item.size === payload?.selectedVariant?.size,
  );
  if (productVeriant?.stock === 0) {
    throw new AppError(httpStatus.FORBIDDEN, 'This product is out of stock!');
  }

  // Check the requested quantity is exceeds available stock.
  if (productVeriant!.stock < payload?.quantity) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      `Only ${productVeriant?.stock} item's available in stock for the selected variant.`,
    );
  }

  const data = await Cart.findOneAndUpdate(
    { userId },
    { $push: { items: payload } },
    { new: true },
  );
  return data;
};

const getALlProductFromCart = async (userId: string) => {
  // Check the cart is exist
  const isCartExists = await Cart.findOne({ userId });
  if (!isCartExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found for this user.!');
  }

  const data = await Cart.findOne({ userId })
    .select('-_id items')
    .populate('items.productId');
  return data;
};

const deleteProductFromCart = async (
  userId: string,
  productId: string,
  SKU: string,
) => {
  // Check the cart is exist
  const isCartExists = await Cart.findOne({ userId });
  if (!isCartExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Cart not found for this user.!');
  }

  //   Check the the deleted product is exist on cart
  const isDeletedProductExistsOnCart = await Cart.findOne({
    userId,
    'items.selectedVariant.SKU': SKU,
  });
  if (!isDeletedProductExistsOnCart) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The product you are trying to remove is not in your cart.',
    );
  }

  await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId, 'selectedVariant.SKU': SKU } } },
    { new: true },
  );
};

const updateProductQuantity = async (
  userId: string,
  productId: string,
  SKU: string,
  action: string,
) => {
  const isProductExists = await Product.findById(productId).select('variants');
  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  const veriant = isProductExists?.variants?.find(
    (veriant) => veriant.SKU === SKU,
  );
  const availableStock = veriant?.stock;

  const cartItems = await Cart.findOne({ userId }).select('items');
  const cartProductVeriant = cartItems?.items?.find(
    (item) =>
      item.productId.toString() === productId &&
      item.selectedVariant.SKU === SKU,
  );

  // Update quantity
  if (action === 'increase') {
    if (cartProductVeriant!.quantity === availableStock!) {
      throw new AppError(httpStatus.CONFLICT, `You cannot add more than ${availableStock} units for this product.`);
    }
    cartProductVeriant!.quantity += 1;
  } else if (action === 'decrease') {
    if (cartProductVeriant?.quantity == 1) {
      throw new AppError(httpStatus.NOT_FOUND, 'Quantity cannot be less than 1. To remove this item, please use the delete option.');
    }
    cartProductVeriant!.quantity = cartProductVeriant!.quantity - 1;
  }

  await cartItems?.save();
};

export const CartServices = {
  addProductIntoCart,
  getALlProductFromCart,
  deleteProductFromCart,
  updateProductQuantity,
};
