import { NextFunction, Request, Response } from "express";
import { TUserRole } from "../modules/user/user.interface";
import { catchAsync } from "../utils/catchAsync";
import httpStatus from 'http-status';
import AppError from "../errors/AppError";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {

    return catchAsync(async(req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;
        
        if(!token){
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized person!')
        };

        const decodedToken = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;

        const {userRole, userEmail} = decodedToken;

        // Check the user is exists or not
        const isUserExists = await User.findOne({userEmail}).select('-password');
        if(!isUserExists){
            throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
        };

        // Check the user is already delete
        const isUserDelete = isUserExists?.isDelete;
        if(isUserDelete){
            throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
        };

        // Check the user is banned
        const userStatus = isUserExists?.status;
        if(userStatus === 'banned'){
            throw new AppError(httpStatus.FORBIDDEN, 'This user is banned !');
        };

        if(requiredRoles && !requiredRoles.includes(userRole)){
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized person!');
        };

        req.user = decodedToken as JwtPayload;
        next();

    })

};

export default auth;