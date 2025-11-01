import  { model,Schema } from "mongoose"; 

const userSchema = new Schema({ 
    userIs:{
        type:Schema.Types.ObjectId  , 
        unique:true
     },
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
        default:"https://res.cloudinary.com/ddmtv1dut/image/upload/v1761449270/5907_ng3njp.jpg"
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