/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { TErrorSource } from "../global/error.interface";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode = 500;
    let message = 'Something went wrong';
    let errorSource: TErrorSource = [{
        path: '',
        message: 'Something went wrong'
    }];


    if(err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSource = simplifiedError?.errorSource;
    }


    return res.status(statusCode).json({
        success: false,
        message,
        error: err
    })

};

export default globalErrorHandler;