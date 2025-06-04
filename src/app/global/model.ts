import { Schema } from 'mongoose';
import { TShippingAddress, TUserName } from './interface';

export const UserNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
});

export const ShippingAddressSchema = new Schema<TShippingAddress>({
  addressCategory: {
    type: String,
    required: [true, "Address category is required."],
  },
  recipientsName: {
    type: String,
    required: [true, "Recipient's name is required."],
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required.'],
    match: [
      /^\+?\d{7,15}$/,
      'Phone number is invalid. It should contain 7 to 15 digits.',
    ],
  },
  address: {
    type: String,
    required: [true, 'Address is required.'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required.'],
    trim: true,
  },
  postalCode: {
    type: String,
    required: [true, 'Postal code is required.'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'State is required.'],
    trim: true,
  },
  country: {
    type: String,
    required: [true, 'Country is required.'],
    trim: true,
  },
});
