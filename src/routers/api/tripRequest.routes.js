import express from 'express';
import {
  getAllTripRequest,
  getSingleTripRequest,
  createTripRequest,
  updateTripRequest,
  deleteTripRequest,
  createMultiTripRequest,
  approveTripRequest,
  rejectTripRequest,
} from '../../controllers/tripRequestController';
import {
  commentOnRequests,
  getComments,
  deleteComment,
} from '../../controllers/tripRequest.comments';
import { protect } from '../../controllers/authentication';

const router = express.Router();

router.post('', protect, createTripRequest);
router.post('/multi', protect, createMultiTripRequest);
router.get('/get', protect, getAllTripRequest);
router.get('/get/:id', protect, getSingleTripRequest);
router.patch('/update/:id', protect, updateTripRequest);
router.delete('/:id', protect, deleteTripRequest);

router.put('/approve/:id', protect, approveTripRequest);
router.put('/reject/:id', protect, rejectTripRequest);
//trip request comments
router.post('/:tripRequestId/comment', protect, commentOnRequests);
router.get('/:tripRequestId/comments', protect, getComments);
router.delete('/comments/:id/delete', protect, deleteComment);

export default router;
