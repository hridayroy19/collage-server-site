import departmentInterfact from "./dpInterface";
import { departmentModel } from "./dpModel"


const departmentHeadDb = async (deparmtn:departmentInterfact) =>{
    const result = await departmentModel.create(deparmtn)
    return result;
}
  

 export const departmentService = {
    departmentHeadDb
}