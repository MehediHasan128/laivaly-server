import { Schema } from 'mongoose';
import { TShippingAddress, TUserName } from './interface';

export const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters'],
    maxlength: [50, 'First name must be at most 50 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters'],
    maxlength: [50, 'Last name must be at most 50 characters'],
  },
});

export const shippingAddressSchema = new Schema<TShippingAddress>({
  addressCategory: {
    type: String,
    required: [true, 'Address category is required'],
    trim: true,
  },
  recipientsName: {
    type: String,
    required: [true, "Recipient's name is required"],
    trim: true,
    minlength: [2, "Recipient's name must be at least 2 characters"],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\+?[0-9]{10,15}$/, 'Phone number must be valid'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
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
    match: [/^\d{4,10}$/, 'Postal code must be 4 to 10 digits'],
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
  }
});
