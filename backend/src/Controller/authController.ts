import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import { signupValidations } from "../validations/authValidator.js"
import { User } from "../db/Model/UserModel.js"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { signinValidation } from "../validations/authValidator.js"
import { tokenGenerator } from "../utils/TokenGenerator.js"
import { Tree } from "../db/Model/TreeModel.js"


export const SignUp = async(req:Request,res:Response)=>{
    const result = signupValidations.safeParse(req.body) 
    if(result.error){

        console.log("error in validation is : ",result.error) 
        res.status(400).json({
            message:"invalid validation" , 
        }) 
        return 
    }

    try {
        const {email,password,username} = result.data 
        const isUserAlreadyExists= await  User.findOne({
            email
        }) 
        if(isUserAlreadyExists){
            res.status(400).json({
                message:"user already exists"
            })
        }else{
            const trees = await Tree.find({
                isFree:true 
            }) 

            const salt = await bcrypt.genSalt(8) 
            const hashedPassword = await bcrypt.hash(password,salt)
          
            const createdUser = await User.create({
                username , 
                email , 
                password:hashedPassword ,
                createdAt:Date.now() , 
                Trees:trees               
            })
            
            const token = jwt.sign({userId:createdUser._id} as JwtPayload ,process.env.JWT_SECRET  as string) 
            
            res.status(201).json({
                User:createdUser,
                token
            })
        }
    } catch (error) {
        console.log("error in the signup controller is ",error)
        res.status(500).json({
            message:"error " , 
        })
    }
}

export const SignIn = async(req:Request,res:Response)=>{
    const result = signinValidation.safeParse(req.body) ; 
    
    if(result.error){
        
        console.log("error in signin validation",result.error) ; 
        res.status(400).json({
            message:"invalid Validation"
        })
        return ; 
    }
    try {
        const {email,password} = result.data ;  
       
        const isUserAlreadyExists  = await User.findOne({
            email
        })

      
        if(isUserAlreadyExists){
            const check = await bcrypt.compare(password,isUserAlreadyExists.password) ; 
            if(check){
                const userId = isUserAlreadyExists._id.toString()   
                const token = tokenGenerator(userId as string ) 
                res.status(200).json({
                    message:"user Logged in" , 
                    token 
                })
            }
            else{
                res.status(400).json({
                    message:"unable to find user" 
                })
            }
        }
    } catch (error) {
        console.log("error ",error)
        res.status(500).json({
            message:"error"
        })
    }
}

export const isUSer = async(req:Request,res:Response)=>{
    try {
        const userId = req.userId ;  

        if(!userId){
            res.status(400).json({
                message:"unauthorized"
            })
        }else{
            const user = await User.findById(userId)
            res.status(200).json({
                message:"here is your user" , 
                user:user?.populate("trees","sessions")
            }) 
        }
    } catch (error) {
        console.log("error  is ",error)
        res.status(500).json({
            message:"error occured"
        })
    }
} 