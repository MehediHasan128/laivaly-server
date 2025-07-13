export interface TErrorSource {
    path: string | number;
    message: string;
}

export interface TGenericErrorResponce {
    statusCode: number;
    message: string;
    errorSource: TErrorSource[];
}