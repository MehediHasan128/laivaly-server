import { TUserToken } from "../modules/auth/auth.interface";
import jwt from 'jsonwebtoken';

export const createToken = (payload: TUserToken, secret_key: string, expIn: number): string => {
    return jwt.sign(payload, secret_key, {expiresIn: `${expIn}d`});
}