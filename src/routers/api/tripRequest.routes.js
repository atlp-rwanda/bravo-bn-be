import express from 'express';
import {
  getAllTripRequest,
  getSingleTripRequest,
  createTripRequest,
  updateTripRequest,
  deleteTripRequest,
  getTripRequestStat,
  createMultiTripRequest,
  approveTripRequest,
  rejectTripRequest,
} from '../../controllers/tripRequestController';
import { protect } from '../../controllers/authentication';

const router = express.Router();

router.post('', protect, createTripRequest);
router.post('/multi', protect, createMultiTripRequest);
router.get('/get', protect, getAllTripRequest);
router.get('/get/:id', protect, getSingleTripRequest);
router.patch('/update/:id', protect, updateTripRequest);
router.delete('/:id', protect, deleteTripRequest);
router.get('/status', protect, getTripRequestStat);

router.put('/approve/:id', protect, approveTripRequest);
router.put('/reject/:id', protect, rejectTripRequest);

export default router;
