import type { Request, Response } from "express";
import { Tree } from "../db/Model/TreeModel.js";
import { User } from "../db/Model/UserModel.js";

export const addTree = async (req:Request,res:Response)=>{
    try {
        
        const isAdmin = await User.findById(req.userId) 
        
        if(isAdmin?.type==="admin"){
            
        const {name,treeImage , isFree , cost} = req.body ;  
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

        }else{
            res.status(400).json({
                message:"not allowed "
            })
        }
    } catch (error) {
        console.log("error in creating tree is" , error) ; 
    }

} 

export const purchaseTree = async (req:Request,res:Response)=>{
    try {
        const {selectedTree} = req.body ; 
        const user = await User.findById(req.userId)
        const tree = await Tree.findById(selectedTree) 

        if(!tree ||  !user){
            res.status(404).json({
                message:"tree not found"
            })
            return 
        }
        if(tree.cost < user.totalPoints ){
            user.totalPoints -= tree.cost  ; 
            user.updateOne({Trees:selectedTree}) 
            await user.save()
            res.status(200).json({
                message:"added tree"
            })
        }else{
            
            console.log("gareeb spotted")
            res.status(403).json({
                message:"not enough points"
            })
        }

    } catch (error) {
        console.log("Error in purchasing a tree" ,error)
        res.status(500).json({
            message:"server error"
        })
    }
} 
