import { TUserName } from "../../global/interface";
import { USER_ROLE } from "./user.contant";

export interface TUser {
    id: string;
    userName: TUserName;
    userEmail: string;
    userProfileURL: string | null;
    password: string;
    role: 'admin' | 'staff' | 'customer';
    status: 'active' | 'pending' | 'banned';
    isDelete: boolean;
};

export type TUserRole = keyof typeof USER_ROLE