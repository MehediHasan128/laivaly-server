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

    

}

export const BuyerServices = {
    addBuyerInfoIntoDB
}