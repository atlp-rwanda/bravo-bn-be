import express from 'express';
import { leavingFrom, goingTo, travelDate, returnDate, travelReason, status, requesterId, accomodationId, getAllTripRequest, getSingleTripRequest, createTripRequest, updateTripRequest, deleteTripRequest } from '../../controllers/tripRequestController';
//import isAdmin from '../../middlewares/isAdmin';
//import isValidRole from '../../middlewares/isValidRole';
import { protect } from '../../controllers/authentication';

const router = express.Router();

router.post('/', protect, createTripRequest)
router.get('/', protect, getAllTripRequest);
router.get('/:id', protect, getSingleTripRequest)
router.post('/:id', protect, updateTripRequest)
router.delete('/:id', protect, deleteTripRequest)

export default router;
