import jwt from "jsonwebtoken";

import { NextFunction, Request } from "express";


const userAuth = async (req:Request , res:Response , next:NextFunction) =>{
    const { token} = req.cookies;
    console.log(token , 'my token');
    

    if(!token){
        throw new Error("Not Authorized Login Again")
    }
    try {
      const tokenDecode =  jwt.verify(token,"secrecte")
       
      if(tokenDecode?.id){
        req.body.userId = tokenDecode.id
      } else{
        throw new Error("Not Authorized Login Again")
      }
      next()

    } catch (error) {
       next(error) 
    }

}


export default userAuth;