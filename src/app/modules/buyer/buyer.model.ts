/* eslint-disable no-useless-escape */
import { model, Schema } from 'mongoose';
import { TBuyer } from './buyer.interface';
import { ShippingAddressSchema, UserNameSchema } from '../../global/model';
import { TShippingAddress } from '../../global/interface';

const BuyerSchema = new Schema<TBuyer>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    ref: 'User',
  },
  userName: {
    type: UserNameSchema,
    required: [true, 'User name (first and last) name is required'],
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
      },
    },
    message: 'Please provide a valid email address',
  },
  profileImage: {
    type: String,
    default: '',
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'Gender must be either male or female',
    },
    required: [true, 'Gender is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+?[1-9]\d{1,14}$/, 'Phone number is invalid'],
  },
  shippingAddress: {
    type: [ShippingAddressSchema],
    validate: [
      (val: TShippingAddress[]) => val.length > 0,
      'At least one shipping address is required',
    ],
  }
}, {timestamps: true});


export const Buyer = model<TBuyer>('Buyer', BuyerSchema);
