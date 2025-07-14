export interface TUserLogin {
    userEmail: string;
    password: string;
};

export type TResetData = TUserLogin; 
export type TPasswordChange = TUserLogin;