import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponce } from "../global/error.interface";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponce => {

    const errorSource: TErrorSource = [{
        path: err?.path,
        message: err?.message
    }];

    const statusCode = 400;

    return {
        statusCode,
        message: 'Invalid ID',
        errorSource
    }

};

export default handleCastError;