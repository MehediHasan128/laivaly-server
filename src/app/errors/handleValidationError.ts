import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponce } from "../global/error.interface";

const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponce => {
    
    const errorSource: TErrorSource = Object.values(err.errors).map((value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: value?.path,
            message: value?.message
        }
    });

    const statusCode = 400;

    return {
        statusCode,
        message: 'Validation error',
        errorSource
    }

};

export default handleValidationError;