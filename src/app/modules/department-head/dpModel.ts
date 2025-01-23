import { model, Schema } from "mongoose";
import departmentInterfact from "./dpInterface";


const deparmentSchema = new Schema<departmentInterfact>({

    name: { type: String, require: true },
    // photo: { type: String, required: true },
    // email: { type: String, required: true },
    // department: { type: String, required: true },
    // salary: { type: Number, required: true },
    // exprience: { type: String, required: true }, 
    // role: { type: String, required: true } 
})


export const  departmentModel = model<departmentInterfact>('departmentHead', deparmentSchema)