import type { Request, Response } from "express"; 
import { User } from "../db/Model/UserModel.js";

export const updateProfile = async(req:Request,res:Response)=>{
    try {
        const {profilePicture,username} = req.body 
        const userId = req.userId  ; 
        const updated = await User.findByIdAndUpdate({
            userId
        },{
            profilePicture , 
            username 
        } 
    )
    res.status(200).json({
        updated    
    })
    } catch (error) {
        console.log("error in the updatig Profile is  : ", error)     
    }
}

export const deleteProfile = async(req:Request,res:Response)=>{
    try {
        const userId = req.userId ; 
        await User.findByIdAndDelete({
            userId 
         }) 
         res.status(200).json({
            message:"deleted account !"
         }) 
    } catch (error) {
        console.log(
            "error in deleting profile " , error
         )
    }
}