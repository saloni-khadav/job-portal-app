// import express from 'express';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './utils/db.js';

// import { clerkWebhooks } from './controllers/Webhooks.js';
// dotenv.config({})
// const app=express();



// app.use(express.json());
// app.post('/Webhooks',clerkWebhooks)
// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());

// const corsOptions={
//     origin:'http//Localhost:5173',
//     Credentials:true
// }
// app.use(cors(corsOptions));

// const PORT=process.env.PORT|| 3000;
// app.listen(PORT,()=>{
//     connectDB();
// console.log(`server running at port ${PORT}`);
// })



import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import { clerkWebhooks } from './controllers/Webhooks.js';
import bodyParser from 'body-parser'; 
import user from "./models/user.js";

dotenv.config();

const app = express();

app.set('case sensitive routing', false);
// 👇 Raw body parser just for Clerk webhook
app.post('/webhooks', express.raw({ type: '*/*' }), clerkWebhooks);

// app.post('/webhooks', clerkWebhooks);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});





app.get("/users", async (req, res) => {
  const users = await user.find();
  res.json(users);
});