import  { model,Schema } from "mongoose"; 
import dotenv from "dotenv" 
import { string } from "zod";
dotenv.config() 

const userSchema = new Schema({ 
    userId:{
        type:Schema.Types.ObjectId  , 
        unique:true
     },

     type:{
        type:String , 
        default:"user"
     } ,
      
    username:{
        type:String , 
        unique:true ,
        min:6,
        max:20  ,
        required:true
    } , 
    password:{
        type:String  , 
        min:6,
        required:true
    },
    profilePicture:{
        type:String , 
        required:false , 
        default:process.env.DEFAULT_PROFILE_PICTURE
    } , 
    email:{
        type:String  ,
        unique:true,
        required:true
    } , 
    streak:{
        type:Number , 
        default:0  
    } , 
    totalPoints:{
        type:Number , 
        default:0 
    }  , 
    Sessions:[
        {
            type:Schema.Types.ObjectId , 
            ref:"Session"
        }
    ] ,  
    Trees:[
        {
            type:Schema.Types.ObjectId , 
            default:"1" , 
            ref:"Tree"
        }
    ] ,
    createdAt:{
        type:Date , 
        required:true   
    }
})

export const User = model("User",userSchema) ; 