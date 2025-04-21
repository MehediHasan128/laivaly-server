import AppError from "../../errors/AppError";
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
    console.log(buyerId);
}


const addShippingAddressIntoDB = async(buyerId: string, address: Pick<TBuyer, 'shippingAddress'>) => {
    console.log(buyerId, address);
}


export const BuyerServices = {
    addBuyerInfoIntoDB,
    addShippingAddressIntoDB,
    addBuyerProfilePictureIntoDB
}