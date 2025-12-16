import crypto from "crypto";


export const generateToken = ()=>{
    return crypto.randomBytes(16).toString("hex")
}


// uper wale ko validate krne ke liye ek method 
export const validateToken = (token)=>{
    return token.length === 32;
}