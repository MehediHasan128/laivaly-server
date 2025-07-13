import { Response } from "express";

interface TResponce<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T
}

export const sendResponce = <T>(res: Response, data: TResponce<T>) => {

    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data
    });

}