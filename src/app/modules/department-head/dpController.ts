import { Request,Response } from "express";
import { departmentService } from "./dpService";


const crateDepartmentHead = async (req:Request , res:Response) =>{
   
    try {
        const  result = await departmentService.departmentHeadDb()
        res.status(200).json({
            status:true,
            message: "Successfully data create",
            data: result
        })
    } catch (error) {  
        console.log(error);
        
    }
}


export const deparmentController = {
    crateDepartmentHead
}