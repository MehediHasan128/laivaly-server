import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponce } from "../types/error";

export const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponce => {

    const errorSources: TErrorSources[] = [
        {
            path: err?.path,
            message: err?.message
        }
    ];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid ID',
        errorSources
    }

}