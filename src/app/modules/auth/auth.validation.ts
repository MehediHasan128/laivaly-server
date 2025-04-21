import { z } from "zod"

const userSignInValidationSchema = z.object({
    body: z.object({
        userEmail: z.string(),
        password: z.string()
    })
})

export const AuthValidation = {
    userSignInValidationSchema
}