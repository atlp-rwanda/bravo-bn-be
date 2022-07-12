import express from 'express';
import {
  getAllTripRequest,
  getSingleTripRequest,
  createTripRequest,
  updateTripRequest,
  deleteTripRequest,
} from '../../controllers/tripRequestController';
import { protect } from '../../controllers/authentication';

const router = express.Router();

router.post('', protect, createTripRequest);
router.get('/get', protect, getAllTripRequest);
router.get('/get/:id', protect, getSingleTripRequest);
router.patch('/update/:id', protect, updateTripRequest);
router.delete('/:id', protect, deleteTripRequest);

export default router;