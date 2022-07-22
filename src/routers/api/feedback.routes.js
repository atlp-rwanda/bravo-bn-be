import express from 'express';
import {
  getFeedback,
  sendFeedback,
} from '../../controllers/feedback.controller';

import { protect } from '../../controllers/authentication';

const feedbackRouter = express.Router();

feedbackRouter.post('/feedback', protect, sendFeedback);
feedbackRouter.get('/getAll', protect, getFeedback);

export default feedbackRouter;
