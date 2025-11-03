import express from "express" 
import { addTree } from "../Controller/treeController.js"

const router  = express.Router() 

try {
    router.post('/createTree',addTree) ; 
} catch (error) {
    console.log(error)
}
export default router ; 