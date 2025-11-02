import jwt, { type JwtPayload } from "jsonwebtoken" 
import { Schema, type ObjectId } from "mongoose";
export function tokenGenerator(userId:ObjectId){
    const token = jwt.sign({userID:userId} as JwtPayload,process.env.JWT_SECRET as string)
    return token ; 
}