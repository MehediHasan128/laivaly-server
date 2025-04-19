import { Types } from "mongoose"
import { TShippingAddress, TUserName } from "../../global/interface";

export type TBuyer = {
    userId: Types.ObjectId;
    userName: TUserName;
    userEmail: string;
    profileImage: string;
    dateOfBirth: Date;
    gender: 'male' | 'female';
    phoneNumber: string;
    shippingAddress: TShippingAddress[];
}