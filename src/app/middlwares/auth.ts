/* eslint-disable @typescript-eslint/no-unused-vars */
import { TUserRole } from "../modules/users/user.interface";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from 'http-status';
import decodedToken from "../utils/decodedToken";
import config from "../config";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/users/user.model";
import { NextFunction, Request, Response } from "express";

const Auth = (...requiredRole: TUserRole[]) => {
    return catchAsync(async(req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        // if a user don't send any token
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized person')
        };

        // Decoded token
        let decoded;
        try{
            decoded = decodedToken(token, config.jwt_access_secret_token as string) as JwtPayload
        } catch (error) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'Unauthorized person')
        };

        const {userEmail, role} = decoded;

        // Check the user is exist on database
        const isUserExist = await User.findOne({userEmail: userEmail}).select('-password');
        if(!isUserExist){
            throw new AppError(httpStatus.NOT_FOUND, 'User is not found!');
        }

        if(requiredRole && !requiredRole.includes(role)){
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are unauthorized person',
              );
        };

        req.user = decoded;
        next();
    })
};

export default Auth;