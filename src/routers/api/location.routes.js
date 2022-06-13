import express from 'express';
import {
  createLocation,
  getAllLocation,
  getSingleLocation,
  updateLocation,
  deleteLocation,
} from '../../controllers/location.controller';

import { protect } from '../../controllers/authentication';

const router = express.Router();

router.get('/', getAllLocation);
router.post('/create', protect, createLocation);
router.get('/:id', getSingleLocation);
router.put('/:id', protect, updateLocation);
router.delete('/:id', protect, deleteLocation);
export default router;
