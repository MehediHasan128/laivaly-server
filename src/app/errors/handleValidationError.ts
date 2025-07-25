import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponce } from "../types/error";

export const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponce => {

    const errorSources: TErrorSources[] = Object.values(err.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: value?.path,
            message: value?.message
        }
    });

    const statusCode = 400;

    return {
        statusCode,
        message: 'Mongoose validation error',
        errorSources
    }

}