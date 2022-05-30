import express from 'express';
import userRouter from './users';
import swaggerRouter from './swagger.js';

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/docs',swaggerRouter);

export default apiRouter;