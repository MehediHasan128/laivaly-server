import { z } from "zod"

const createUserValidationSchema = z.object({
    password: z.string()
    .min(8, {message: 'Password must be at least 8 characters long'})
    .regex(/[A-Z]/, {message: 'Password must contain at least one uppercase letter'})
    .regex(/[0-9]/, {message: 'Password must contain at least one number'})
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {message: 'Password must contain at least one special character'})
})

export const UserValidation = {
    createUserValidationSchema
}