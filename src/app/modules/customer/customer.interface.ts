import { Types } from "mongoose";
import { TShippingAddress, TUserName } from "../../global/interface";

export interface TCustomer {
    userId: Types.ObjectId;
    customerId: string;
    userName: TUserName;
    userEmail: string;
    dateOfBirth: string | null;
    phoneNumber: string | null;
    gender: 'men' | 'women' | null;
    shippingAddress: TShippingAddress[] | [];
    isDeleted: boolean;
}