import express from "express";
import dotenv from "dotenv";
import authenticate from "./config/mongodb.js"
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import showData from './routes/showData.js'
import orderData from './routes/orderData.js'
const app = express();
dotenv.config();
const PORT = process.env.PORT;
app.use(cors());
authenticate();

app.use(express.json());
app.use('/vip',authRoute);
app.use('/vip',showData);
app.use('/vip',orderData);

app.listen(PORT, () =>
    console.log(`http://localhost:${PORT}`)
);
