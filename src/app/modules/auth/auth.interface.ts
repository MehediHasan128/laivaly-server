import { Types } from "mongoose";

export type TAuthCredential = {
    userEmail: string;
    password: string;
}


export type TChangePassowd = {
    oldPassword: string;
    newPassword: string;
}


export type TResetData = TAuthCredential;


export type TUserToken = {
    userEmail: string;
    userId: Types.ObjectId;
    userName: object;
    id: string;
    profileImage: string;
    role: string;
}