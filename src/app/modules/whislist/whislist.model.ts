import { model, Schema } from "mongoose";
import { TWhislist } from "./whislist.interface";

const WhisListSchema = new Schema<TWhislist>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    }
});


export const Whislist = model<TWhislist>('whislist', WhisListSchema);