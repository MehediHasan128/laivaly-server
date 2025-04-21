import { Types } from "mongoose";

export type TAuthCredential = {
    userEmail: string;
    password: string;
}


export type TChangePassowd = {
    oldPassword: string;
    newPassword: string;
}


export type TUserToken = {
    userEmail: string;
    userId: Types.ObjectId;
    id: string;
    profileImage: string;
    role: string;
}