import type { Request, Response } from "express";
import { Tree } from "../db/Model/TreeModel.js";

export const addTree = async (req:Request,res:Response)=>{
    try {
        const {name,treeImage , isFree , cost,createdAt} = req.body ;  
        const response = await Tree.create({
            Name :name  , 
            treeImage , 
            isFree , 
            cost , 
            createdAt:Date.now() 
         }) 
         res.status(200).json({
            message:"tree created :)"   , 
            response 
         })
    } catch (error) {
        console.log("error in creating tree is" , error) ; 
    }
}