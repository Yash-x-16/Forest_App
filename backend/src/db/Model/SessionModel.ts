import { Schema,model } from "mongoose"; 

const sessionSchema = new Schema({
    
    sessionId:{
        type:Schema.Types.ObjectId , 
        unique:true 
    } , 
    
    endTime:{
        type:Number , 
    } ,
    
    isSuccesful:{
        type:Boolean , 
        required:true,
        default:false
    } , 
    
    sessionPoints:{
        type:Number  , 
        default:0 
    } ,
   
    totalTime:{
    type:Number , 
    required:true 
   }, 

    userId:{
        type:Schema.Types.ObjectId , 
        ref:"User" 
    } , 
    
    selectedTree:{
        type:Schema.Types.ObjectId , 
        ref:"Tree"
    },

    createdAt:{
    type:Date , 
    required:true   
    }
})

export const Session = model("Session",sessionSchema) ; 