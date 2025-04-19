import { Schema } from "mongoose";
import { TUserName } from "./interface";

const UserNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    }
});

export default UserNameSchema;