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

    // Check the wishlist is exist on collection
    const isExistWhislist = await Whislist.findOne({userId: payload?.userId, productId: payload?.productId});
    if(isExistWhislist){
        throw new AppError(httpStatus.CONFLICT, 'This product is already add to wishlist')
    };

    const data = await Whislist.create(payload);

    return data;

};

const getAllWhislitBasedonUserFromDB = async(userId: string) => {
   
    const isUserExist = await User.findById(userId);
    if(!isUserExist){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    };

    // const check the user is delete or not
    const isUserDelete = isUserExist?.isDeleted;
    if(isUserDelete){
        throw new AppError(httpStatus.BAD_REQUEST, 'User is already deleted')
    };

    const data = await Whislist.find({userId: userId}).populate({path: 'productId', select: 'thumbnail title price _id'});

    return data;
    
};

const getSingleProductFromWhislist = async(userId: string, productId: string) => {
    const data = await Whislist.findOne({userId, productId});
    return data
}

const deleteWhislistFromDB = async(whislistId: string) => {
    
    // Checck the whislist is exist or not
    const isWhisListExist = await Whislist.findById(whislistId);
    if(!isWhisListExist){
        throw new AppError(httpStatus.NOT_FOUND, 'Whislist not found')
    };

    await Whislist.findByIdAndDelete(whislistId);

}

export const WhislistServices = {
    addWhislistIntoDB,
    getAllWhislitBasedonUserFromDB,
    deleteWhislistFromDB,
    getSingleProductFromWhislist
}