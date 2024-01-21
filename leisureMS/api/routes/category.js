import express from "express";
const router = express.Router();
import {verifyAdmin} from "../utils/verifyToken.js"
import  CategoryController from "../controllers/category.js";


// create an categories routes
router.post("/", verifyAdmin, CategoryController.createCategories);
router.get('/', CategoryController.getCategories);
router.put("/:id", CategoryController.updateCategories);
router.delete("/:id", CategoryController.deleteCategry);

export default router;