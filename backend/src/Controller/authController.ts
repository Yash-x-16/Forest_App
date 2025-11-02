import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import { signupValidations } from "../validations/authValidator.js"
import { User } from "../db/Model/UserModel.js"
import jwt, { type JwtPayload } from "jsonwebtoken"
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
        console.log("already user is : ",isUserAlreadyExists)
        if(isUserAlreadyExists){
            res.status(400).json({
                message:"user already exists"
            })
        }else{
            const salt = await bcrypt.genSalt(8) 
            const hashedPassword = await bcrypt.hash(password,salt)
          
            const createdUser = await User.create({
                username , 
                email , 
                password:hashedPassword ,
                createdAt:Date.now()
            })
            
            const token = jwt.sign({userId:createdUser.userId} as JwtPayload ,process.env.JWT_SECRET  as string) 
            
            res.status(201).json({
                User:{createdUser,
                password:null},
                token
            })
        }
    } catch (error) {
        console.log("error in the signup controller is ",error)
        res.status(500).json({
            message:"error in the signup controller"
        })
    }
}

export const SignIn = async(req:Request,res:Response)=>{

}

export const isUSer = async(req:Request,res:Response)=>{

}