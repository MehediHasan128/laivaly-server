import { Schema } from "mongoose";
import { TShippingAddress, TUserName } from "./interface";

export const UserNameSchema = new Schema<TUserName>({
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

export const ShippingAddressSchema = new Schema<TShippingAddress>({
    street: {
        type: String,
        required: [true, 'Street is required']
    },
    city: {
        type: String,
        required: [true, 'City is required']
    },
    state: {
        type: String,
        required: [true, 'State is required']
    },
    postalCode: {
        type: String,
        required: [true, 'Postalcode is required']
    },
    country: {
        type: String,
        required: [true, 'Country is required']
    }
})