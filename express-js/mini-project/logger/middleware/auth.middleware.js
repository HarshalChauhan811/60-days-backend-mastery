import { validateToken } from "../utils/token-utils.js";

const authMiddleware = (req , res , next)=>{
    const token = req.headers['authorization'];     // token ko aise access 

    if(token && validateToken(token)){
        req.user = {name:"Harshal" , id:1};    // custom user 
        next()
    }
    else{
        res.status(401).send("Unauthorized: invalid or missign token")
    }

}

export default authMiddleware;