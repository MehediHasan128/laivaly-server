import { TUserName } from '../../global/interface';
import jwt from 'jsonwebtoken';

export interface TJwtPayload {
  userId: string;
  userName: TUserName;
  userEmail: string;
  userProfileURL: string;
  userRole: string;
}

export const createToken = (jwtPayload: TJwtPayload, secretToken: string, expiresIn: string,) => {
    return jwt.sign(jwtPayload, secretToken, {expiresIn: Number(expiresIn)})
};
