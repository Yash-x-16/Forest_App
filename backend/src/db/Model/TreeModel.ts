import { Schema,model } from "mongoose";

const treeSchema = new Schema({
    treeId:{
        type:Schema.Types.ObjectId , 
        uniqure:true
    } , 
    Name:{
        type:String , 
        uniqure:String , 
    } , 
    treeImage:{
        type:String
    } , 
    isFree:{
        type:Boolean , 
        default:false
    } ,
    cost:{
        type:Number , 
        required:true , 
        default:0 
    } , 
        createdAt:{
        type:Date , 
        required:true   
    }
})

export const Tree = model("Tree",treeSchema)