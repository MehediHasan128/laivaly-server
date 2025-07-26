import { model, Schema } from 'mongoose';
import { TStaff } from './staff.interface';
import { userNameSchema } from '../../global/model';

const createStaffSchema = new Schema<TStaff>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User ID is required.'],
      ref: 'User',
    },
    staffId: {
      type: String,
      required: [true, 'Staff ID is required.'],
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
    dateOfBirth: {
      type: Date,
      default: null,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    stafCategory: {
      type: String,
      enum: ['men', 'women', 'children'],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Staff = model<TStaff>('staff', createStaffSchema);
