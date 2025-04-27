import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { User } from "../users/user.model"
import { TWhislist } from "./whislist.interface"
import httpStatus from 'http-status';
import { Whislist } from "./whislist.model";

const addWhislistIntoDB = async(payload: TWhislist) => {
    
    // Check the user is exist or not
    const isUserExist = await User.findById(payload?.userId);
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    };

    // const check the user is delete or not
    const isUserDelete = isUserExist?.isDeleted;
    if(isUserDelete){
        throw new AppError(httpStatus.BAD_REQUEST, 'User is already deleted')
    };


    // Check the product is exist or not
    const isProductExist = await Product.findById(payload?.productId);
    if(!isProductExist){
        throw new AppError(httpStatus.NOT_FOUND, 'Product not found')
    };

    // const check the user is delete or not
    const isProductDelete = isProductExist?.isDeleted;
    if(isProductDelete){
        throw new AppError(httpStatus.BAD_REQUEST, 'Product is already deleted')
    };

    const data = await Whislist.create(payload);

    return data;

}

export const WhislistServices = {
    addWhislistIntoDB
}