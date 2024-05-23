import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';
import { createProductController, deleteProductController, getAllProductsController, getProductPhotoController, getSingleProductController, updateProductController } from '../controllers/productController.js';
import formidable from 'express-formidable';


const router = express.Router();




// routes

// create product
router.post('/create-product' , requireSignIn , isAdmin ,formidable() ,  createProductController)

// get all products
router.get('/get-all-product' , getAllProductsController )

// get single product  
router.get('/get-single-product/:slug'  , getSingleProductController)

// get photo  (pid = product id )
router.get('/product-photo/:pid' , getProductPhotoController)


// delete product (pid = product id)
router.delete('/delete-product/:pid' , deleteProductController)

// update  product (pid = product id)
router.put('/update-product/:pid' , requireSignIn , isAdmin ,formidable() ,  updateProductController)

export default router;

