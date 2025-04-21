import { TUserName } from "../../global/interface";
import { userRole } from "./user.constant";

export type TUser = {
    userName: TUserName;
    id: string;
    userEmail: string;
    password: string;
    profileImage: string;
    status: 'active' | 'inactive' | 'banned' | 'pending' | 'deleted';
    role: 'buyer' | 'admin';
    isDeleted: boolean;
};

export type TUserRole = (typeof userRole)[keyof typeof userRole];