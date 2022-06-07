import express from "express";
import {
  createRoom,
  getAllRooms,
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../controllers/room.controller";

const router = express.Router();

router.route("/").get(getAllRooms);
router.route('/:accomodationId').post(createRoom)
router.route("/:id").get(getSingleRoom).put(updateRoom).delete(deleteRoom);

export default router;
