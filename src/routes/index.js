import express from 'express';
import userRoutes from './user.routes';
import docsRouter from '../Documentation/index.doc';
import testSwaggerRouter from '../routers/testSwaggerRouter';
import accomodation from '../routes/accomodation.routes.js';
const router=express.Router();

router.use('/api/v1/users',userRoutes);
router.use('/api/testSwagger', testSwaggerRouter);
router.use('/api/docs' ,docsRouter)
router.use('/api/v1/accomodation', accomodation);

export default router;
 