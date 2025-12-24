import { model, Schema } from 'mongoose';
import { TOtp } from './otp.interface';

const otpSchema = new Schema<TOtp>({
  identifier: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },
});

export const OTP = model<TOtp>('otp', otpSchema);
