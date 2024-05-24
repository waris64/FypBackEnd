import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './route/authRoute.js';
import recordRouter from "./route/router.js"
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import the cors middleware
import userModel from './model/userModel.js'
dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Mongo   is connected');
    })
    .catch((error) => {
        console.log('Error while connecting DB', error);
    });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Use cors middleware
const PORT = 3000;

app.listen(PORT, (error) => {
    if (error) {
        console.error('Error while starting the server:', error);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

app.get("/", (req, res) => {
    const data = { message: "Hello from the backend!" };
    res.json(data);
  });

app.use('/api/auth', authRoutes);
app.use('/api/records',recordRouter)
app.post('register/',(req,res)=>{
    userModel.create(req.body)
    .then(signUp=>res.json(signUp))
    .catch(err=>err.json(err))
})
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
