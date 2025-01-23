import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { userModel } from '../users/user.model';
import jwt from 'jsonwebtoken'
import config from '../../config';
import transporter from '../../config/nodemailer';



export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new Error('missing Details')
    }
    try {
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            // return res.json({ success: false, message: 'user all ready existis' })
            throw new Error('user all ready existis')
        }
        const hashedPassword = await bcrypt.hash(password, 8)

        const user = new userModel({ name, email, password: hashedPassword })
        await user.save()
        //    up user create now genereat token 
        const token = jwt.sign({ id: user._id }, "secrecte", { expiresIn: "7d" })
        res.cookie('token', token,)

        //sending wellcome mail

        const mailOption = {
            from:process.env.SMTP_EMAIL,
            to:email,
            subject:"Wellcome to Aptouch Institute",
            text:`hello welcome to our institute ${email}`
        }

        transporter.sendMail(mailOption);



        return res.json({ success: true })


    } catch (error) {
        next(error)
    }

}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
        // return res.json({ success: false, message: 'Email and Password are required' })
        throw new Error('Email and Password are required')
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            // return res.json({ success: false, message: 'invalid email' })

            throw new Error('invalid email')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            // return res.json({ success: false, message: 'invalid Password' })
            throw new Error('invalid Password')
        }
        //methching token 
        const token = jwt.sign({ id: user._id }, "secrecte", { expiresIn: "7d" })
        res.cookie('token', token, {
            httpOnly: true,
            secure: config.NODE_env === 'production',
            sameSite:config.NODE_env === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true })


    } catch (error) {
        next(error)
    }
}


export const logOut = async (req: Request, res: Response, next: NextFunction) => {

    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: config.NODE_env === 'production',
            sameSite:config.NODE_env === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, message: "user LogOut" })

    } catch (error) {
        next(error)
    }
}


// export const AuthController = {
//     register,
//     login,
//     logOut
// }