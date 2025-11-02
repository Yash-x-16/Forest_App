import express from "express" 
import { isUSer, SignIn, SignUp } from "../Controller/authController.js"

const router= express.Router()  

try {

    router.post('/signUp',SignUp)    
    router.post('/signIn',SignIn)    
    router.get('/isUser',isUSer)
         
} catch (error) {
    console.log("error in the authRoute is",error)
}

export default router ; 