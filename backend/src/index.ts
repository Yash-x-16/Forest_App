console.log('radhe radhe :)')
import express from "express" 
import dotenv from "dotenv" 
import cors from "cors"
import { ConnectDb } from "./db/db.js" 
import authRoutes from "./Routes/authRoutes.js" 
import sessionRoutes from "./Routes/sessionRoutes.js" 
import treeRoutes from "./Routes/treeRoutes.js"
dotenv.config()

const app = express() 

app.use(cors())
app.use(express.json())


app.use("/api/auth",authRoutes)
app.use("/api/sessions",sessionRoutes)
app.use("/api/profile",sessionRoutes)
app.use("/api/tree",treeRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`port is running on port ${process.env.PORT}`)
    ConnectDb()
}) 