import { TUserName } from '../../global/interface';
import jwt from 'jsonwebtoken';

export interface TJwtPayload {
  id: string;
  userName: TUserName;
  userEmail: string;
  userProfileURL: string | null;
  userRole: string;
}

export const createToken = (jwtPayload: TJwtPayload, secretToken: string, expiresIn: string,) => {
    return jwt.sign(jwtPayload, secretToken, {expiresIn: Number(expiresIn)})
};
