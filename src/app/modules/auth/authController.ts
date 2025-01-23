import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import { userModel } from '../users/user.model';



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
        
        const user = new userModel ({name, email , password:hashedPassword})
        await user.save()





    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        res.json({ seccess: false, message: error.message })
    }

}



export const AuthController = {
    register
}