import AppError from "../../errors/AppError";
import { Product } from "../product/product.model"
import { TCartItem } from "./cart.interface"
import httpStatus from 'http-status';
import { Cart } from "./cart.model";

const addProductIntoCart = async(userId: string, payload: TCartItem) =>{
    
    // Check the product is exist
    const isProductExists = await Product.findById(payload?.productId);
    if(!isProductExists){
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found!')
    };

    // Check the product is delete
    const isProductDelete = isProductExists?.isDeleted;
    if(isProductDelete){
        throw new AppError(httpStatus.FORBIDDEN, 'Product is already delete!')
    };

    const data = await Cart.findOneAndUpdate({userId}, {$push: {items: payload}}, {new: true});
    return data
};

const getALlProductFromCart = async(userId: string) => {

   const data = await Cart.findOne({userId}).select('-_id items').populate('items.productId');
   return data;

}

export const CartServices = {
    addProductIntoCart,
    getALlProductFromCart
}