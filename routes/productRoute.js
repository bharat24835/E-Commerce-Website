import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js';
import { createProductController, deleteProductController, getAllProductsController, getProductCountController, getProductPhotoController, getSingleProductController, productCategoryController, productFilterController, productListController,  relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
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

// filter product
router.post('/product-filter' , productFilterController)

// product count  
router.get(('/product-count') , getProductCountController);

// product per-page
router.get('/product-list/:page' , productListController);

// search product
router.get('/search/:keyword' , searchProductController);

// similar product
router.get('/related-product/:pid/:cid' , relatedProductController)

// category wise product
router.get('/product-category/:slug' , productCategoryController)


export default router;

