import z  from "zod"

export const signupValidations = z.object({
    username:z.string().min(6).max(20) , 
    email:z.email() , 
    password:z.string() , 
    profilePicture:z.string().optional() , 
})

export const signinValidation = z.object({ 
    email:z.email() , 
    password:z.string() ,  
})