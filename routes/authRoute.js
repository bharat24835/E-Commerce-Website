import express from 'express';
import {registerController , loginController ,testController} from '../controllers/authController.js';
import { requireSignIn , isAdmin} from '../middlewares/authMiddlewares.js';

// router object

const router  = express.Router()


// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ ROUTING   ##############################################

// REGISTER   || Method : Post

router.post('/register' , registerController )


// LOGIN || Method : Post
router.post('/login', loginController)

// Forgot Password || POST

// test route 
router.get('/test' ,requireSignIn ,isAdmin ,  testController);

// protected route auth
router.get('/user-auth' , requireSignIn , (req ,res) =>{
    res.status(200).send({ok :"true"});
})


export default router;