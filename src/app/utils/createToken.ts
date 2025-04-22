import { TUserToken } from "../modules/auth/auth.interface";
import jwt from 'jsonwebtoken';

type ExpTime = `${number}${'ms' | 's' | 'm' | 'h' | 'd' | 'w' | 'y'}` | number;

export const createToken = (payload: TUserToken, secret_key: string, expIn: ExpTime): string => {
    return jwt.sign(payload, secret_key, {expiresIn: expIn});
}