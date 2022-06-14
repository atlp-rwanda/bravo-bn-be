import express from 'express';
import { getAllTripRequest, getSingleTripRequest, createTripRequest, updateTripRequest, deleteTripRequest } from '../../controllers/tripRequestController';
import { protect } from '../../controllers/authentication';

const router = express.Router();

router.post('', protect, createTripRequest)
router.get('', protect, getAllTripRequest);
router.get('/:id', protect, getSingleTripRequest)
router.patch('/:id', protect, updateTripRequest)
router.delete('/:id', protect, deleteTripRequest)

export default router;
