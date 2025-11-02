import type { Request, Response } from "express";
import { sessionValidations } from "../validations/sessionValidator.js";
import { Tree } from "../db/Model/TreeModel.js";
import { User } from "../db/Model/UserModel.js";
import { Session } from "../db/Model/SessionModel.js";

export const createSession =async(req:Request,res:Response)=>{
    
    const result = sessionValidations.safeParse(req.body) ; 
    
    if(result.error){
        console.log("validation error") 
        res.status(400).json({
            message:"invalid validations"
        })
        return 
    }
    try {
        
        const{totalTime , selectedTree,startTime,endTime } = result.data ;
        
        const user = await User.findOne(req.userId) 
        const tree = await Tree.findById(selectedTree) ; 
         if (!tree) return res.status(404).json({ message: "Tree not found" });
        const ownsTree = user?.Trees.includes(tree._id ) ;
        if(!ownsTree || !tree.isFree){
            res.status(400).json({
                message:"you don't own this tree"
            }) 
            return ; 
        }

        const newSession = await Session.create({
            selectedTree , 
            startTime , 
            sessionPoints : 0 ,
            endTime , 
            totalTime 
        })
        
        res.status(200).json({

            message:"session created" , 
            sessionId:newSession.sessionId 
        })

     } catch (error) {
        console.log("error in the creating session" ,error) ;         
    }
}

export const endSession =async(req:Request,res:Response)=>{
    try {
        const {isSuccesful,endTime,sessionId} = req.body 
        const user =await  User.findById(req.userId)
        const session =await  Session.findById(sessionId)  
        if(!session || !user){
            res.status(404).json({
                message:"user or session not found "
            })
            return 
        }
        session.isSuccesful = isSuccesful
    } catch (error) {
        console.log("error in ending the endsession")
        res.status(500).json({
            message:"error in the server"
        })
    }
}