// import express from 'express';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './utils/db.js';
// import bodyParser from 'body-parser';
// import user from './models/user.js';

// import { clerkWebhooks } from './controllers/Webhooks.js';
// dotenv.config({})
// const app=express();

// app.post('/Webhooks',
//   bodyParser.raw({ type: 'application/json' }), // raw body only for this route
//   clerkWebhooks
// );

// app.use(express.json());

// app.use(express.urlencoded({extended:true}));
// app.use(cookieParser());

// const corsOptions={
//     origin:'http://Localhost:5173',
//     Credentials:true
// }
// app.use(cors(corsOptions));

// const PORT=process.env.PORT|| 3000;

// const startServer = async () => {
//   await connectDB();
//   app.listen(PORT, () => {
//     console.log(`Server running at port ${PORT}`);
//   });
// };





// startServer();
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import { clerkWebhooks } from './controllers/Webhooks.js';
import bodyParser from 'body-parser'; // 👈 ADD THIS
import user from "./models/user.js";

dotenv.config();

const app = express();

// 👇 This MUST come BEFORE express.json()
// app.post('/Webhooks', bodyParser.raw({ type: 'application/json' }), clerkWebhooks);
app.post('/Webhooks', clerkWebhooks);
// Regular middleware AFTER webhook
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173', // 🔧 fix typo: http// → http://
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