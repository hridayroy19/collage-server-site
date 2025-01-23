import { Router } from "express"
import { login, logOut, register, sendVerifyOtp, verifyEmail } from "./authController"
import userAuth from "../../middleware/userAuth"

const authRoute = Router()

authRoute.post('/register',register),
authRoute.post('/login',login)
authRoute.post('/logout',logOut)
authRoute.post('/sendvery-otp',userAuth,sendVerifyOtp)
authRoute.post('/verify-acount',userAuth,verifyEmail)



export default authRoute


