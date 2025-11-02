import { Request } from "express"; 
import type { ObjectId } from "mongoose";

declare module "express-serve-static-core"{
    interface Request{
        userId:ObjectId
    }
}
