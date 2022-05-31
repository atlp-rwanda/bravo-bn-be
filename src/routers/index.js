import express from 'express';
import apiRouter from './api/index';

const allRoutes = express.Router();

allRoutes.get("/", (req,res) => {
    res.json({message: "Welcome to barefoot!"})
});

allRoutes.use('/api/v1', apiRouter);

export default allRoutes;

// import express from 'express';
// import userRoutes from './user.routes';
// import docsRouter from '../Documentation/index.doc';
// import testSwaggerRouter from './testSwaggerRouter';
// const router=express.Router();

// router.use('/api/v1/users',userRoutes);
// router.use('/api/testSwagger', testSwaggerRouter);
// router.use('/api/docs' ,docsRouter)
// router.use('/',(req, res) => {
//     res.status(200).json({ success: true, message: "You are using Barefoot nomad app." })
//   });

// export default router;
 