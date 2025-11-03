import express from "express" 
import { Middleware } from "../middleware/middleware.js"
import { createSession, endSession, getAllSessions } from "../Controller/sessionController.js"

const router = express.Router() 


try {
    router.post("/createSession",Middleware,createSession)
    router.post("/endSession",Middleware,endSession)
    router.get("/getAllSessions",Middleware,getAllSessions) 
} catch (error) {
    console.log("error in the sessionRoute is ",error) 
}
export default router