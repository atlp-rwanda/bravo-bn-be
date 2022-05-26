import express from 'express';
const app = express();
import docsRouter from './Documentation/index.doc';
import testSwaggerRouter from './routers/testSwaggerRouter';
import dotenv from 'dotenv'
dotenv.config();

const port = process.env.PORT || 3000;

app.get("/", (req,res) => {
    res.json({message: "Welcome to barefoot!"})
});

app.use('/api/testSwagger', testSwaggerRouter);
app.use('/api/docs',docsRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT}`)
})