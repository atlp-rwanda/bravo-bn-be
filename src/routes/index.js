import express from 'express';
import userRoutes from './user.routes';
import docsRouter from '../Documentation/index.doc';
import accomodation from '../routes/accomodation.routes.js';
import testSwaggerRouter from './testSwaggerRouter';
const router=express.Router();

router.use('/api/v1/users',userRoutes);
router.use('/api/testSwagger', testSwaggerRouter);
router.use('/api/docs' ,docsRouter)
router.use('/api/v1/accomodation', accomodation);
router.use('/',(req, res) => {
    res.status(200).json({ success: true, message: "You are using Barefoot nomad app." })
  });

export default router;
 