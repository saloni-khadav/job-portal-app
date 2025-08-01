import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';

import { clerkWebhooks } from './controllers/Webhooks.js';
dotenv.config({})
const app=express();

// app.get("/home",(req,res)=>{
//     return res.status(200).json({
//         message:"i am from backend",
//         Success:true
//     })
// });

app.use(express.json());
app.post('/Webhooks',clerkWebhooks)
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions={
    origin:'http//Localhost:5173',
    Credentials:true
}
app.use(cors(corsOptions));

const PORT=process.env.PORT|| 3000;
app.listen(PORT,()=>{
    connectDB();
console.log(`server running at port ${PORT}`);
})