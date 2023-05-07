import express from "express";
import { engine } from "express-handlebars";
import departmentRouter from "./routes/admin/departments.js"

import dotenv from 'dotenv';
dotenv.config();

import mongoose from "mongoose";
mongoose.connect(process.env.mongoConnectionUrl);

const app = express();

app.use(express.urlencoded({ extended: true} ));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './templates');

app.use('/admin', departmentRouter);


app.listen(process.env.port, () => {
    console.log(`The application started on http://localhost:${process.env.port}`);
});

