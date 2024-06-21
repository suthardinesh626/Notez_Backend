// import dotenv from 'dotenv';
// import connectDB from "./db/index.js";
// import { app } from "./app.js"

// dotenv.config({
//     path: './.env'
// });

// connectDB()
//     .then(() => {
//         app.listen(process.env.PORT || 3000, () => {
//             console.log(`Server is running on port: ${process.env.PORT}`);
//         })
//     })
//     .catch((err) => {
//         console.log("MONGO connection failed!!", err);
//     })

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from "./db/index.js";

// Load environment variables from .env file
dotenv.config({
    path: './.env'
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port: ${process.env.PORT || 3000}`);
        });
    })
    .catch((err) => {
        console.log("MONGO connection failed!!", err);
    });
const app = express();

// Middleware configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from './routes/user.routes.js';
import noteRouter from './routes/note.routes.js';

app.use("/api/v1/users", userRouter);
app.use("/api/v1/note", noteRouter);

// Database connection and server start
