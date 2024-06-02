import express from 'express';
import {registerController , loginController ,testController, forgotPasswordController, updateProfileController} from '../controllers/authController.js';
import { requireSignIn , isAdmin} from '../middlewares/authMiddlewares.js';

// router object

const router  = express.Router()


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ROUTING   ##############################################

// REGISTER   || Method : Post

router.post('/register' , registerController )


// LOGIN || Method : Post
router.post('/login', loginController)

// Forgot Password || POST 
router.post('/forgot-password' , forgotPasswordController);


// test route 
router.get('/test' ,requireSignIn ,isAdmin ,  testController);

// protected route auth
router.get('/user-auth' , requireSignIn , (req ,res) =>{
    res.status(200).send({ok :"true"});
})

// protected route user
router.get('/admin-auth' , requireSignIn , isAdmin , (req ,res) =>{
    res.status(200).send({ok :"true"});
})

// update profile
router.put('/profile-data' , requireSignIn , updateProfileController);


export default router;