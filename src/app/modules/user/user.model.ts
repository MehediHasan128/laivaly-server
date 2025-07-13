import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import { userNameSchema } from '../../global/model';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'User Id is required']
    },
    userName: {
      type: userNameSchema,
      required: [true, 'User name is required'],
    },
    userEmail: {
      type: String,
      required: [true, 'User email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
    },
    userProfileURL: {
      type: String,
      required: [true, 'User profile URL is required'],
      match: [/^https?:\/\/.+/, 'User profile URL must be a valid URL'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters long'],
      validate: {
        validator: function (pass: string) {
          return /[A-Z]/.test(pass) && /[!@#$%^&*(),.?":{}|<>]/.test(pass);
        },
        message:
          'Password must contain at least one uppercase letter and one special character',
      },
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'staff', 'customer'],
        message: 'Role must be either admin, staff, or customer',
      },
      required: [true, 'User role is required'],
    },
    status: {
      type: String,
      enum: {
        values: ['active', 'pending', 'banned'],
        message: 'Status must be either active, pending, or banned',
      },
      default: 'pending',
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Bcrypt user password
userSchema.pre('save', async function (next) {
  
  this.password = await bcrypt.hash(this.password, Number(config.bcrypt_salt_rounds));
  next();

})

export const User = model<TUser>('User', userSchema);
