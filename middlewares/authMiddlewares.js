import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';

// protected routes token base
// authenticate user

export const requireSignIn = async(req, res , next)=>{
try {
    const decode = JWT.verify(req.headers.authorization , process.env.JWT_SECRET) ;
    // decode give the user_id , (id ko toh voh token mai convert kiya tha )
    req.user = decode;
    next();

} catch (error) {
    console.log(error);
}   

}

// admin access
export const isAdmin = async(req, res, next)=>{
    try {
        // we need to chack wheater use is admin or not
      //  const {email} = req.body;
        const user = await userModel.findById(req.user._id);
        if(!user){
            return res.status(404).send({status : "Failed" , message : "User is not Registere"})
        }
        if( user.role !== 1 ){
            return res.status(404).send({status : "Failed" , message : "UnAuthorized Access "});
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
    }
}