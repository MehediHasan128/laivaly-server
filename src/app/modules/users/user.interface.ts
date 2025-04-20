import { TUserName } from "../../global/interface";

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