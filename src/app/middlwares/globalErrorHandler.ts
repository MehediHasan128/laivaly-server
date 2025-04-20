/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import { TErrorSource } from "../interface/error";
import AppError from "../errors/AppError";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSource: TErrorSource = [{
    path: '',
    message: ''
  }];


  if(err instanceof ZodError){
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSource;
  }else if(err instanceof AppError){
    statusCode = err?.statusCode;
    message = err?.message;
    errorSource = [{
      path: '',
      message: err?.message
    }]
  }


  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    error: err
  })

};

export default globalErrorHandler;