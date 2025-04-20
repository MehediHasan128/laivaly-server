/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { TErrorSource } from '../global/error.interface';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import AppError from '../errors/AppError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'Something went wrong';
  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }else if(err?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource
  }else if(err?.name === 'CastError'){
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource
  }else if(err?.code === 11000){
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError.errorSource
  }else if(err instanceof AppError){
    statusCode = err?.statusCode,
    message = err?.message,
    errorSource = [{
      path: '',
      message: err?.message
    }]
  }else if(err instanceof Error){
    message = err.message;
    errorSource = [{
      path: '',
      message: err.message
    }]
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error: errorSource
  });
};

export default globalErrorHandler;
