import mongoose from "mongoose"; 

export async function ConnectDb(){
    try {
        
        const cnn =   await mongoose.connect(process.env.DB_URL as string)  
         console.log("db connected : " , cnn.connection.host)

    } catch (error) {
        console.log("error in connecting db: ",error)      
    }
}