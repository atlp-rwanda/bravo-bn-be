import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import '@babel/polyfill';

import express from 'express';
const app = express();

app.use(cors());

app.get("/",(req,res,next)=>{
    res.status(200).json({message:"welcome"});
})

export default app;