import { Schema,model } from "mongoose"; 

const sessionSchema = new Schema({
    
    sessionId:{
        type:Schema.Types.ObjectId , 
        unique:true 
    } , 
    
    startTime:{
        type:Date , 
        required:true 
    } , 
    
    endTime:{
        type:Date , 
        required:true 
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