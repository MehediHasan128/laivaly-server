import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponce } from "../global/error.interface";

const handleZodError = (err: ZodError): TGenericErrorResponce => {

    const errorSource: TErrorSource = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue?.path.length - 1],
            message: issue?.message
        }
    });

    const statusCode = 400;

    return {
        statusCode,
        message: 'Zod validation error',
        errorSource
    }

};

export default handleZodError;