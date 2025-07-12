import { Types } from "mongoose";
import { TShippingAddress, TUserName } from "../../global/interface";

export interface TCustomer {
    userId: Types.ObjectId;
    customerId: string;
    userName: TUserName;
    userEmail: string;
    dateOfBirth: Date | null;
    phoneNumber: string | null;
    gender: 'male' | 'female' | null;
    shippingAddress: TShippingAddress[] | null;
    isDeleted: boolean;
}