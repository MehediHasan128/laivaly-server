import { Types } from "mongoose"
import { TShippingAddress, TUserName } from "../../global/interface";

export type TBuyer = {
    userId: Types.ObjectId;
    id: string;
    userName: TUserName;
    userEmail: string;
    password: string;
    profileImage: string;
    dateOfBirth?: Date;
    gender?: 'male' | 'female';
    phoneNumber?: string;
    shippingAddress?: TShippingAddress[];
    isDeleted: boolean;
}