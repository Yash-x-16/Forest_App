import { Schema } from "mongoose"
import z from "zod" 

export const sessionValidations = z.object({
    totalTime:z.number() , 
    selectedTree:Schema.Types.ObjectId ,  
    startTime:z.date().optional() , 
    endTime:z.date().optional()
})