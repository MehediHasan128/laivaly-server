import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../users/user.model';
import { TCart } from './cart.interface';
import { Cart } from './cart.model';
import { Product } from '../product/product.model';
import mongoose from 'mongoose';

const addCartIntoDB = async (payload: TCart) => {
  // Check the user is exit or not
  const isUserExist = await User.findById(payload?.userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Check the product is exit or not
  const isProductExist = await Product.findById(payload?.items[0].productId);
  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found!');
  }

  // Check the product quantity
  const productQuantity = isProductExist?.inStock;
  if (!productQuantity) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product stock out!');
  }

  // Check the user is exit on cart data collection
  const isUserExitOnCart = await Cart.findOne({ userId: payload?.userId });
  if (!isUserExitOnCart) {
    const createNewCart = await Cart.create(payload);
    return createNewCart;
  } else {
    const { items } = isUserExitOnCart;

    const addedProductsOnCart = items.find(
      (item) =>
        item.productId.equals(
          new mongoose.Types.ObjectId(payload?.items[0].productId),
        ) &&
        (item.color === payload?.items[0].color &&
          item.size === payload?.items[0].size),
    );
    // If find the added product is already add to cart then only update the quantity
    if (addedProductsOnCart) {
      const updateQuantity = await Cart.findOneAndUpdate(
        { userId: payload?.userId },
        {
          $set: {
            'items.$[elem].quantity':
              addedProductsOnCart?.quantity + payload.items[0].quantity,
          },
        },
        {
          arrayFilters: [
            {
              'elem.productId': new mongoose.Types.ObjectId(
                payload?.items[0].productId,
              ),
              'elem.color': payload?.items[0].color,
              'elem.size': payload?.items[0].size,
            },
          ],
          new: true,
        },
      );
      return updateQuantity;
    } else {
      const addNewProduct = await Cart.findOneAndUpdate(
        { userId: payload?.userId },
        { $push: { items: payload?.items[0] } },
        { new: true },
      );
      return addNewProduct;
    }
  }
};

const getAllCartProductFromDB = async(userId: string) => {
  const data = await Cart.find({userId}).populate('items.productId');
  return data;
};

const productAddOrRemoveFromCart = async(payload: {_id: string; color: string; size: string; method: string}) => {

  const product =  Cart.findOne({'items._id': payload?._id}, {items: {$elemMatch: {_id: payload?._id, color: payload?.color, size: payload?.size}}});

  const result = await product.findOneAndUpdate({'items._id': payload?._id}, { $inc: { 'items.$.quantity': (payload?.method === 'add')? +1 : -1 } }, {new: true})

  
  return result

}

export const CartServices = {
  addCartIntoDB,
  getAllCartProductFromDB,
  productAddOrRemoveFromCart
};



// *
// const data = {_id: 10, userId: 001, items: [{_id: 552, productId: 220, color: '#000000', size: 'M', quantity: 2}]}
// * 