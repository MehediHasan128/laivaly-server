import { Response } from "express";

type TResponceData<T> = {
    statusCode: number;
    success: boolean;
    message?: string;
    data: T;
}


const sendResponce = <T>(res: Response, data: TResponceData<T>) => {

    return res.status(data?.statusCode).json({
        statusCode: data?.statusCode,
        success: data?.success,
        message: data?.message,
        data: data?.data
    })

};

export default sendResponce;