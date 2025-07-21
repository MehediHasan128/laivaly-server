import { Response } from "express";

interface TMetaData {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
}

interface TResponce<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    metaData?: TMetaData
}

export const sendResponce = <T>(res: Response, data: TResponce<T>) => {

    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        metaData: data.metaData
    });

}