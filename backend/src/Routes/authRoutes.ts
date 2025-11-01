import express from "express" 
import { SignUp } from "../Controller/authController.js"

const router= express.Router()  

try {

    router.post('/signUp')    
    router.post('/signIn')    
    router.get('/isUser')
         
} catch (error) {
    console.log("error in the authRoute is",error)
}

export default router ; 