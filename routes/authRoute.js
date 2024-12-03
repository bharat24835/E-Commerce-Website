import express from 'express';
import {registerController , loginController ,testController, updateProfileController,resetPasswordController} from '../controllers/authController.js';
import { requireSignIn , isAdmin , password_reset ,generateOTP ,SendMail } from '../middlewares/authMiddlewares.js';

// router object

const router  = express.Router()


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ROUTING   ##############################################

// REGISTER   || Method : Post

router.post('/register' , registerController )


// LOGIN || Method : Post
router.post('/login', loginController)

// Forgot Password || POST 
router.post('/forgot-password' , password_reset , generateOTP ,   SendMail );
router.post('/reset-password' ,  resetPasswordController)


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