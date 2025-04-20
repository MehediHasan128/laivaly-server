/* eslint-disable no-useless-escape */
import { model, Schema } from 'mongoose';
import { TBuyer } from './buyer.interface';
import { ShippingAddressSchema, UserNameSchema } from '../../global/model';

const BuyerSchema = new Schema<TBuyer>({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
    ref: 'User',
  },
  id: {
    type: String,
    required: [true, 'ID is required']
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
    default: null,
  },
  dateOfBirth: {
    type: Date,
    default: null
  },
  gender: {
    type: String,
    default: null
  },
  phoneNumber: {
    type: String,
    match: [/^\+?[1-9]\d{1,14}$/, 'Phone number is invalid'],
    default: null
  },
  shippingAddress: {
    type: [ShippingAddressSchema],
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});


export const Buyer = model<TBuyer>('Buyer', BuyerSchema);
