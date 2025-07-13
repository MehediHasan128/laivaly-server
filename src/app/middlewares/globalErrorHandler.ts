/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSources } from "../types/error";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
console.log(err);
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorSources: TErrorSources[] = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ];

    if(err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }

    return res.status(statusCode).json({
        success: false,
        message,
        // mainError: err,
        errorSources
    }) 

}