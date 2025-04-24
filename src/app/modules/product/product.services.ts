/* eslint-disable @typescript-eslint/no-explicit-any */
const addProductIntoDB = async(file: any, payload: string) => {
    console.log(file);
    console.log(payload);
}


export const ProductServices = {
    addProductIntoDB
}