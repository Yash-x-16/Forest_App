import express from "express" 
import { addTree, purchaseTree } from "../Controller/treeController.js"
import { Middleware } from "../middleware/middleware.js";

const router  = express.Router() 

try {
    
    router.post('/createTree',Middleware,addTree) ; 
    router.post('/buyTree',Middleware,purchaseTree)  ;

} catch (error) {
    console.log(error)
}

export default router ; 