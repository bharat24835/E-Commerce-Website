import JWT from 'jsonwebtoken'
import userModel from '../models/userModel.js';
import crypto from 'crypto';
import nodemailer from'nodemailer'
import {google} from 'googleapis'

// protected routes token base
// authenticate user

export const requireSignIn = (req, res , next)=>{
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

  export const password_reset = async(req , res , next)=>{
    
    try {
      const{email} = req.body;
  
      if(!email ){
        return res.status(404).send({   status  : "Failed" , message  : "Please Enter Valid Email " })
    }
  
    // check user
    const user = await userModel.findOne({email : email});
    if(!user){
        return res.status(404).send({status : "Failed"  , message : "Email not Registered"})
    }
    req.body.name = user.name;
    next();
  
  
    } catch (error) {
      res.status(500).send({status :"Failed"  , message : "Error in Sending OTP " , error});
  
    }
  }
  export const generateOTP = (req ,res , next)=>{
    const length = 6;
    const otp = crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
    const {email , name} =req.body;
    console.log("OTP IS" , otp);
    req.body.otp = otp;
    next();
  
  }
  
  export const SendMail = (req , res)=>{
   const{name , email , otp  } = req.body;
  
  const OAuth2 = google.auth.OAuth2
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const refreshToken = process.env.REFRESH_TOKEN;
  const user = process.env.USER;
  
  const OAuth2_client = new OAuth2(clientId , clientSecret)
  OAuth2_client.setCredentials({refresh_token : refreshToken});
  
  
    function send_email (name , recipent , message){
      const access_token = OAuth2_client.getAccessToken();
  
      const transport = nodemailer.createTransport({
          service : 'gmail',
          auth : {
              type : 'OAUTH2',
              user : user,
              clientId : clientId,
              clientSecret : clientSecret,
              refreshToken : refreshToken,
              accessToken : access_token
  
          }
  
      })
      const mailOptions  = {
          from : ` BHARAT THE LEGEND <${user}>`,
          to :  recipent,
          subject : "Check Your Email",
          html : get_otp_message(name , message)
      }
  
      transport.sendMail(mailOptions , function(error , result) {
           if(error ){
            console.log('Error' , error);
           }
           else{
              console.log('Success ' , result);
           }
           transport.close();
      })
  }
  
  function get_otp_message(name , message){
   return (`<h1> Hi ${name} , OTP for Password Reset is ${message} </h1>`)
  }
  try {
    send_email(name , email , otp);
  res.send({status : "Success"  , message  : "EMail send Successfully" , otp : `${otp}`})
  } catch (error) {
    console.log(error);
    res.send({status : "Failed"   , message : "Error in Sending Email"})
  }}