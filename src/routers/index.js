import express from 'express';
import apiRouter from './api/index';
import swaggerRouter from './api/swagger';


const allRoutes = express.Router();

allRoutes.get("/", (req, res) => {
    res.json({ message: "Welcome to barefoot!" })
});

allRoutes.use('/api/v1', apiRouter);
allRoutes.use('/docs', swaggerRouter)

export default allRoutes;
