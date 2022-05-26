import express from 'express';
import userRoutes from './user.routes';

const router=express.Router();

router.use('/api/v1/users',userRoutes);

export default router;
 