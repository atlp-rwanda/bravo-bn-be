import express from 'express';
const app = express();
import docsRouter from './Documentation/index.doc';
import dotenv from 'dotenv'

dotenv.config();

// console.log(process.env)

const port = process.env.PORT || 3000;


app.use('/api/docs',docsRouter)

app.listen(port,()=>{
    console.log(`app listening on port ${port}`);
})