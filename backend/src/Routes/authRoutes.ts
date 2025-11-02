import express from "express" 
import { SignUp } from "../Controller/authController.js"

const router= express.Router()  

try {

    router.post('/signUp',SignUp)    
    router.post('/signIn',SignUp)    
    router.get('/isUser',SignUp)
         
} catch (error) {
    console.log("error in the authRoute is",error)
}

export default router ; 