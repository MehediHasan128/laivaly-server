import { Types } from "mongoose"

export type TWhislist = {
    userId: Types.ObjectId;
    productId: Types.ObjectId;
}