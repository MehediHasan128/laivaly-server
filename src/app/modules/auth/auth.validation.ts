import { z } from "zod";

const userLoginValidationSchema = z.object({

    body: z.object({
        userEmail: z.string({required_error: 'User email is required'}),
        password: z.string({required_error: 'Password is required'})
    })

});

const forgetUserPasswordValidationSchema = z.object({

    body: z.object({
        userEmail: z.string({required_error: 'User email is required'}),
    })

});


export const AuthValidation = {
    userLoginValidationSchema,
    forgetUserPasswordValidationSchema
}