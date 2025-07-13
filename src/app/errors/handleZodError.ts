import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGenericErrorResponce } from "../types/error";

const handleZodError = (err: ZodError): TGenericErrorResponce => {

    const errorSources: TErrorSources[] = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue.message
        }
    });

    const statusCode = 400;

    return {
        statusCode,
        message: 'Zod Validation Error',
        errorSources
    }

};

export default handleZodError;