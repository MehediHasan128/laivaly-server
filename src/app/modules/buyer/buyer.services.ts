import AppError from "../../errors/AppError";
import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary";
import { User } from "../users/user.model";
import { TBuyer } from "./buyer.interface";
import { Buyer } from "./buyer.model";
import httpStatus from 'http-status';

const addBuyerInfoIntoDB = async(buyerId: string, payload: Partial<TBuyer>) => {
    
    // Check the buyer is exist or not
    const isexistsBuyer = await Buyer.findOne({id: buyerId});
    
    if(!isexistsBuyer){
        throw new AppError(httpStatus.NOT_FOUND, 'Buyer not found');
    }

    const data = await Buyer.findOneAndUpdate({id: buyerId}, payload, {new: true});

    return data;

}


const addBuyerProfilePictureIntoDB = async(buyerId: string) => {
    
    // Const check the user is exists or not
    const isUserExists = await User.findOne({id: buyerId});

    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    };

    // Check the user is user is delete or not
    const isUserDelete = isUserExists?.isDeleted;

    if(isUserDelete){
        throw new AppError(httpStatus.BAD_REQUEST, 'User is already deleted!');
    }


    const uploadImage = await uploadImageToCloudinary();
    console.log(uploadImage);

}


const addShippingAddressIntoDB = async(buyerId: string, address: Pick<TBuyer, 'shippingAddress'>) => {
    console.log(buyerId, address);
}


export const BuyerServices = {
    addBuyerInfoIntoDB,
    addShippingAddressIntoDB,
    addBuyerProfilePictureIntoDB
}