import { z } from "zod";

const userLoginValidationSchema = z.object({

    body: z.object({
        userEmail: z.string({required_error: 'User email is required'}),
        password: z.number({required_error: 'Password is required'})
    })

});


export const AuthValidation = {
    userLoginValidationSchema
}