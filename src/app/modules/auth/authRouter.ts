import { Router } from "express"
import { login, logOut, register } from "./authController"

const authRoute = Router()

authRoute.post('/register',register),
authRoute.post('/login',login)
authRoute.post('/logout',logOut)
export default authRoute


