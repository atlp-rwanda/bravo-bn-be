import express from "express";
import {
  createAmenity,
  getAllAmenity,
  getSingleAmenity,
  updateAmenity,
  deleteAmenity,
} from "../../controllers/amenity.controller";

import { protect } from '../../controllers/authentication';

const router = express.Router();

router.post('/:accomodationId',protect,createAmenity);
router.get("/",getAllAmenity);
router.get("/:id",getSingleAmenity);
router.put("/:id",protect,updateAmenity);
router.delete("/:id",protect,deleteAmenity);

export default router;