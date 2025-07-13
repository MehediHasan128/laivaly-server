import { TUserLogin } from "./auth.interface";

const userLogin = async(payload: TUserLogin) => {
    console.log(payload);
};


export const AuthServices = {
    userLogin
}