import express from 'express';
import {
  getFeedbacks,
  sendFeedback,
} from '../../controllers/feedback.controller';

import { protect } from '../../controllers/authentication';

const feedbackRouter = express.Router();

feedbackRouter.post('/feedback', protect, sendFeedback);
feedbackRouter.get('/getAll/:id', protect, getFeedbacks);

export default feedbackRouter;
