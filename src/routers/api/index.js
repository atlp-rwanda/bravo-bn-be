import express from 'express';
import userRouter from './users';
import swaggerRouter from './swagger.js';
import authRouter from './authentication';
import accommodation from './accommodationRoutes';

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/user/auth', authRouter);
apiRouter.use('/docs',swaggerRouter);
apiRouter.use("/accommodation", accommodation);

export default apiRouter;