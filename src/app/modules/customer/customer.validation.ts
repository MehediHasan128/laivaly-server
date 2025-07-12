import { z } from "zod";
import { userNameValidationSchema } from "../../global/validation";

const customerValidationSchema = z.object({
    userName: userNameValidationSchema,
    userEmail: z.string().email('Please enter a valid email address'),
});


export const customerValidation = {
    customerValidationSchema
}