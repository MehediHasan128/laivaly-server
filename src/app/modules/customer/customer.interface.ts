import { Types } from "mongoose";
import { TUserName } from "../../global/interface";

export interface TCustomer {
    userId: Types.ObjectId;
    userName: TUserName;
    userEmail: string;
    dateOfBirth: Date;
    phoneNumber: string;
    gender: 'male' | 'female';
}