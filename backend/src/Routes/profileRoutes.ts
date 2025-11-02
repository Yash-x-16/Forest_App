import express from "express" 
import { Middleware } from "../middleware/middleware.js"
import { deleteProfile, updateProfile } from "../Controller/profileController.js"

const router = express.Router() 

try {
    router.put('/updateProfile',Middleware,updateProfile)
    router.delete('/deleteProfile',Middleware,deleteProfile)
} catch (error) {
    console.log("error in the profle Router is ",error)
}

export default router