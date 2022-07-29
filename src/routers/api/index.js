import express from 'express';
import userRouter from './users';
import swaggerRouter from './swagger.js';
import authRouter from './authentication';
import tripRequestRouter from './tripRequest.routes';
import chatRouter from './chat.route';

const apiRouter = express.Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/user/auth', authRouter);
apiRouter.use('/docs', swaggerRouter);
apiRouter.use('/user/trip', tripRequestRouter);
apiRouter.use('/chat', chatRouter);

export default apiRouter;
