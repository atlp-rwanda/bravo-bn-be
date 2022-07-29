import express from 'express';
import { getMessages, postMessage } from '../../controllers/chatController';
import { protect } from '../../controllers/authentication';

const router = express.Router();

router.get('/messages', protect, getMessages);
router.post('/message', protect, postMessage);

export default router;
