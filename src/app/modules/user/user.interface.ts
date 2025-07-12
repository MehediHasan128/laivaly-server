import { TUserName } from "../../global/interface";

export interface TUser {
    id: string;
    userName: TUserName;
    userEmail: string;
    userProfileURL: string;
    password: string;
    role: 'admin' | 'staff' | 'customer';
    status: 'active' | 'pending' | 'banned';
    isDelete: boolean;
}