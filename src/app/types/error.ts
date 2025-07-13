export interface TErrorSources {
    path: string | number;
    message: string;
};

export interface TGenericErrorResponce {
    statusCode: number;
    message: string;
    errorSources: TErrorSources[];
}