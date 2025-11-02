import type { NextFunction, Request, Response } from "express";
import jwt, { decode, type JwtPayload } from "jsonwebtoken"
export function Middleware(req:Request,res:Response,next:NextFunction){
    try {
        const token = req.headers["token"] 
        if(!token){
            res.status(404).json({
                message:"token not found" 
            })
            return 
        }

        const decoded = jwt.verify(token as string ,process.env.JWT_SECRET as string) as JwtPayload 
        if(decoded.userId){
            req.userId = decoded.userId ; 
            next() ; 
        }else{
            res.status(400).json({
                message:"unauthorized by middleware"
            })
        }
    } catch (error) {
        console.log("error in the middleware",error) 
        res.status(400).json({
            message:"error in middleware"
        })
    }
}