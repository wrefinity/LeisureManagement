import express from "express";
const router = express.Router();
import {verifyAdmin, verifyToken} from "../utils/verifyToken.js"
import  CoupController from "../controllers/coup.js";

// create an coups routes
router.post("/", verifyAdmin, CoupController.createCoup);
router.get('/', verifyToken, CoupController.getCoupons);
router.delete("/:id", verifyAdmin, CoupController.deleteCoup);

export default router;