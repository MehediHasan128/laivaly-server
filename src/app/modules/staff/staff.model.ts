import { model, Schema } from 'mongoose';
import { TStaffAddress, TStaff } from './staff.interface';
import { userNameSchema } from '../../global/model';

const addressSchema = new Schema<TStaffAddress>({
  houseNumber: {
    type: String,
    required: [true, 'House number is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Street address is required'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true,
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
  },
});

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
    presentAddress: addressSchema,
    permanentAddress: addressSchema,
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const Staff = model<TStaff>('staff', createStaffSchema);
