import express from 'express'
import { isAdmin, requireSignIn } from './../middlewares/authMiddlewares.js';
import { createCategoryController, deleteCategoryController, getCategoryController, getSingleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

// routes
// create category
router.post('/create-category' , requireSignIn , isAdmin , createCategoryController)


//  update category
router.put("/update-category/:id" , requireSignIn , isAdmin , updateCategoryController)

// getAll category
router.get('/get-category' , getCategoryController)

// get single category
router.get('/get-single-category/:slug' , getSingleCategoryController)

// delete category
router.delete('/delete-category/:id' , requireSignIn , isAdmin , deleteCategoryController)

export default router;