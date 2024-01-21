import express from "express";
import {
  createReservation,
  deleteReservation,
  getReserve,
  getReservations,
  updateReservation,
} from "../controllers/reservation.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", createReservation);
//UPDATE
router.put("/:id", verifyAdmin, updateReservation);
//DELETE
router.delete("/:id", verifyAdmin, deleteReservation);
//GET
router.get("/find/:id", getReserve);
//GET ALL
router.get("/", getReservations);

export default router;
