import express from 'express';
import { createRate } from '../../controllers/rates.controller';
import { protect } from '../../controllers/authentication';

const rateRouter = express.Router();

rateRouter.post('/createRate', protect, createRate);
// rateRouter.get('/get', protect, getAllRates)

export default rateRouter;
