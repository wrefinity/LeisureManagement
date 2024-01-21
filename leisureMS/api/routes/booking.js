import express from "express";
import {
  createBooking,
  deleteBooking,
  getBooking,
  getBookings,
  updateBooking,
  updateBookingStatus,
} from "../controllers/booking.js";
import {verifyAdmin, verifyToken} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", verifyToken, createBooking);
//UPDATE
router.put("/:id", verifyAdmin, updateBooking);
router.patch("/status/:id", updateBookingStatus);
//DELETE
router.delete("/:id", verifyAdmin, deleteBooking);
//GET
router.get("/find/:id", getBooking);
//GET ALL
router.get("/", verifyToken, getBookings);

export default router;
