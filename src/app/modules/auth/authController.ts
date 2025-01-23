import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { userModel } from '../users/user.model';
import jwt from 'jsonwebtoken'



const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({ success: false, message: 'missing Details' })
    }
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'user all ready existis' })
        }
        const hashedPassword = await bcrypt.hash(password, 8)

        const user = new userModel({ name, email, password: hashedPassword })
        await user.save()
        //    up user create now genereat token 
        const token = jwt.sign({ id: user._id }, "secrecte", { expiresIn: "7d" })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.Node_env === 'production',
            sameSite: process.env.Node_env === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ success: true })


    } catch (error) {
        res.json({ seccess: false, message: error.message })
    }

}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: 'Email and Password are required' })
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'invalid email' })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: 'invalid Password' })
        }
        //methching token 
        const token = jwt.sign({ id: user._id }, "secrecte", { expiresIn: "7d" })
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.Node_env === 'production',
            sameSite: process.env.Node_env === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true })


    } catch (error) {
        res.json({ seccess: false, message: error.message })
    }
}


const logOut = async (req: Request, res: Response) => {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.Node_env === 'production',
            sameSite: process.env.Node_env === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, message: "user LogOut" })

    } catch (error) {
        res.json({ seccess: false, message: error.message })
    }
}


export const AuthController = {
    register,
    login,
    logOut
}