import { Types } from "mongoose";
import { TUserName } from "../../global/interface";

export interface TStaff {
    userId: Types.ObjectId;
    staffId: string;
    userName: TUserName;
    userEmail: string;
    dateOfBirth: Date | null;
    phoneNumber: string | null;
    isDeleted: boolean;
}