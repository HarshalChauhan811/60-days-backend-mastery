import express from 'express';
import { generateToken } from '../utils/token-utils.js';


const router = express.Router();

// generate token 
// jaise koi user is route ko hit karega to ham ek generate-token api point hit karege to wah hamare liye ek token generate token de dega 
router.get("/generate-token" ,(req , res)=>{
    const token = generateToken();

    res.status(200).send({
        message:"Token generated please save it for future use",
        token: token
    })  // crypto module se jo bhi token ko generate karege 
} )

// Home route
router.get("/" , (req , res)=>{
    res.status(200).send({
        message:"Welcome to the home page🏡"
    })
})


export default router;