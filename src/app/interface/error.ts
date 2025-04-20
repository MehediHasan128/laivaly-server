export type TErrorSource = {
    path: string | number;
    message: string;
}[];

export type TGenericErrorSource = {
    statusCode: number;
    message: string;
    errorSource: TErrorSource;
}