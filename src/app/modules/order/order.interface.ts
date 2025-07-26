import { Types } from "mongoose";
import { TShippingAddress } from "../../global/interface";


export interface TOrderItems {
    productId: Types.ObjectId;
    quantity: number;
    size?: string;
    color?: string;
    SKU: string;
}

export interface TPaymentInfo {
    TXID?: string;
    email?: string;
    paidAt?: Date;
    status?: "success" | "failed";
}

export interface TOrder {
    orderId: string;
    userId: Types.ObjectId;
    orderItems: TOrderItems[];
    shippingAddress: TShippingAddress;
    paymentMethod: "stripe" | "sslcommerz" | "cod";
    paymentStatus: "pending" | "paid" | "failed" | "refunded";
    paymentInfo?: TPaymentInfo;
    itemsPrice: number;
    shippingCharge: number;
    totalPrice: number;
    orderStatus: "processing" | "shipped" | "delivered" | "cancelled" | "returned"
}