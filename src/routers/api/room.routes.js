import express from "express";
import {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../controllers/room.controller";

import { protect } from '../../controllers/authentication';

const router = express.Router();

router.get("/",getAllRooms);
router.post('/:accomodationId',protect,createRoom);
router.get("/:id",getSingleRoom);
router.put("/:id",protect,updateRoom);
router.delete("/:id",protect,deleteRoom);
export default router;
