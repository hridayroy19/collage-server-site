import { model, Schema } from "mongoose";

const userSchama = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyOtp: { type: String, default: "" },
    verifotpExpireAt: { type: Number, default: 0 },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: ''},
    resetOtpExpireAt: { type: Number, default: 0 }

})

export const userModel = model('user', userSchama); 