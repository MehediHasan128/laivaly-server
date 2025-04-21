import { TAuthCredential } from "./auth.interface"

const userSignIn = async(payload: TAuthCredential) => {

    console.log(payload);

}

export const AuthServices = {
    userSignIn
}