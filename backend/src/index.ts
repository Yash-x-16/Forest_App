console.log('radhe radhe :)')
import express from "express" 
import dotenv from "dotenv" 
import { ConnectDb } from "./db/db.js"
dotenv.config()

const app = express() 

app.listen(process.env.PORT,()=>{
    console.log(`port is running on port ${process.env.PORT}`)
    ConnectDb()
}) 