import express from 'express';
import userRoutes from './user.routes';
import docsRouter from '../Documentation/index.doc';
import testSwaggerRouter from '../routers/testSwaggerRouter';
const router=express.Router();

router.use('/api/v1/users',userRoutes);
router.use('/api/testSwagger', testSwaggerRouter);
router.use('/api/docs' ,docsRouter)

export default router;
 