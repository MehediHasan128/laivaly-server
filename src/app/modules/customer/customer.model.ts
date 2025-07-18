import { model, Schema } from 'mongoose';
import { TCustomer } from './customer.interface';
import { shippingAddressSchema, userNameSchema } from '../../global/model';

const customerSchema = new Schema<TCustomer>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required'],
    },
    customerId: {
      type: String,
      required: [true, 'Customer ID is required'],
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
    gender: {
      type: String,
      enum: ['male', 'female'],
      default: null,
    },
    shippingAddress: {
      type: [shippingAddressSchema],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Customer = model<TCustomer>('Customer', customerSchema);
