import express from "express";
import { checkIsAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import { category, createCategoryController, deleteCategoryController, singleCategory, updateCategoryController } from "../controllers/categoryController.js";

const router = express.Router();

// Routes

//create
router.post('/create-category', requireSignIn, checkIsAdmin, createCategoryController)

//update 
router.put('/update-category/:id', requireSignIn, checkIsAdmin, updateCategoryController)

// get all category
router.get('/get-category', category)

//get single Category
router.get('/single-category/:slug', singleCategory)

//delete category
router.delete('/delete-category/:id', requireSignIn, checkIsAdmin, deleteCategoryController)
export default router;