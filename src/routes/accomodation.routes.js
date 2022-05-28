import express from 'express';
import { createAccomodation, getAllAccomodation } from "../services/accomodation.service.js";

const router=express.Router();

router.get('/', getAllAccomodation);
router.post('/create',createAccomodation);

export default router;