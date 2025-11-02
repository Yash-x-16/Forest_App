import jwt, { type JwtPayload } from "jsonwebtoken" 
import { Schema, type ObjectId } from "mongoose";
export function tokenGenerator(userId:string){
    const token = jwt.sign({userId:userId} ,process.env.JWT_SECRET as string,{
        expiresIn:"3d"  ,
    })
    return token ; 
}