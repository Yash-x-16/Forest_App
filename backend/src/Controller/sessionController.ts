import type { Request, Response } from "express";
import { sessionValidations } from "../validations/sessionValidator.js";
import { Tree } from "../db/Model/TreeModel.js";
import { User } from "../db/Model/UserModel.js";
import { Session } from "../db/Model/SessionModel.js";


export const createSession =async(req:Request,res:Response)=>{
    
    const result = sessionValidations.safeParse(req.body) ; 
    
    if(result.error){
        console.log("validation error",result.error) 
        res.status(400).json({
            message:"invalid validations"
        })

        return 
    }
    try {
        
        const{totalTime , selectedTree } = result.data ;
        
        const user = await User.findById(req.userId) 
        const tree = await Tree.findById(selectedTree) ; 
        
        if (!tree) return res.status(404).json({ message: "Tree not found" });

        const ownsTree = user?.Trees.includes(tree._id) ; 
        
        if(!ownsTree || !tree.isFree){
            res.status(400).json({
                message:"you don't own this tree"
            }) 
            return ; 
        }

        const newSession = await Session.create({
            selectedTree , 
            sessionPoints : 0 , 
            totalTime  ,
            createdAt:Date.now()  , 
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
        const {isSuccesful,sessionId,endTime} = req.body ;
        const user = await  User.findById(req.userId)
        const session = await  Session.findById(sessionId)  
        if(!session || !user){
            res.status(404).json({
                message:"user or session not found "
            })
            return 
        }
        if(session.totalTime === endTime){
             session.isSuccesful = true ; 
        }
        else{

            session.isSuccesful = false ;
        }   
         session.endTime = endTime ; 
         session.sessionPoints = session.totalTime *2  ; 
         user.totalPoints += session.sessionPoints ; 
         await user.save() ; 
         await session.save() ;  

         res.status(200).json({
             message:"session ended succesfully "
         })

    } catch (error) {
        console.log("error in ending the endsession",error)
        res.status(500).json({
            message:"error in the server"
        })
    }
}


export const getAllSessions = async(req:Request,res:Response)=>{

    try {

        const userId = req.userId 
        const user = await User.findById(userId) ;
        const allSessions = user?.Sessions 

        res.json({
            sessions:allSessions 
        })
    } catch (error) {
        console.log("error in getting all session",error) 
        res.status(500).json({
            message:"error in the server"
        })
    }
}