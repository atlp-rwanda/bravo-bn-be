import express from 'express';
import {updateLike, getLikes} from "../../controllers/accommodation.controller.js";
import { protect } from '../../controllers/authentication';
const router=express.Router();

router.put('/like/:id',protect,updateLike);
router.get('/like/:id',getLikes)

export default router;