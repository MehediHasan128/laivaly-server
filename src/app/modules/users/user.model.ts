/* eslint-disable no-useless-escape */
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";
import { UserNameSchema } from "../../global/model";
import bcrypt from 'bcrypt';
import config from "../../config";

const UserSchema = new Schema<TUser>({

    userName: {
        type: UserNameSchema,
        required: [true, 'User name (first and last) name is required']
    },
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true
    },
    userEmail: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value: string) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            }
        },
        message: 'Please provide a valid email address'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    },
    profileImage: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned', 'pending', 'deleted'],
        default: 'pending'
    },
    role: {
        type: String,
        enum: ['buyer', 'admin']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {timestamps: true});


// bcrypt the user password
UserSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_round)
    );

    next();
});


export const User = model<TUser>('User', UserSchema);