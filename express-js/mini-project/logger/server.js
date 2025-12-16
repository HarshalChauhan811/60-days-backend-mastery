import express from 'express';
import publicRoutes from "./routes/public.routes.js"
import privateRoutes from "./routes/private.routes.js"
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import logMiddleware from './middleware/log.middleware.js';



const app = express();
const PORT = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


if(!fs.existsSync(path.join(__dirname , "logs"))){
    fs.mkdirSync(path.join(__dirname , "logs"))  // agar nahi hai to create kar do agar hai to join kar do 
}


// *InBuilt Middleware
app.use(express.json());

// !Global Custom Middleware
app.use(logMiddleware)

// ?Middleware to Routes
app.use("/public" , publicRoutes)
app.use("/private" , privateRoutes)



app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})