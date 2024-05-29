import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// import path from 'path';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// const buildpath = path.join(__dirname, "./client/build");
// app.use(express.static(buildpath));


//routes import 
import userRouter from './routes/user.routes.js';
import noteRouter from './routes/note.routes.js';

app.use("/api/v1/users", userRouter)
app.use("/api/v1/note", noteRouter)

export { app };