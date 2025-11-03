import { Schema } from "mongoose"
import z from "zod" 

export const sessionValidations = z.object({
    totalTime:z.number() , 
    selectedTree:z.string() ,  
    startTime:z.date().optional() , 
    endTime:z.date().optional()
})