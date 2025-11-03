import z from "zod" 

export const sessionValidations = z.object({
    totalTime:z.number() , 
    selectedTree:z.string() ,   
    endTime:z.number().optional()
})