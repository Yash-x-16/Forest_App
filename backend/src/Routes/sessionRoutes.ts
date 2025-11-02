import express from "express" 
import { Middleware } from "../middleware/middleware.js"
import { createSession } from "../Controller/sessionController.js"

const router = express.Router() 


try {
    router.post("/createSession",Middleware)
    router.post("/endSession",Middleware)
    router.get("/getAllSessions",Middleware)
} catch (error) {
    console.log("error inthe sessionRoute is ",error) 
}
export default router