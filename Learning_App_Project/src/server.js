import express from "express";
import bodyParser from "body-parser";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors';

require('dotenv').config();   // giup chayj dc dong process.env


let app = express();
app.use(cors({ origin: true }));


app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
})