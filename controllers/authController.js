import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken'


export const registerController = async(req, res)=>{
    
   try {
    
   const {name , email , password , phone ,address , answer} =req.body;
   //validations
   if(!name){
    return res.send({status : 'Failed' , message :"Name is Required"});
   }
   if(!email){
    return res.send({status : 'Failed' , message :"Email is Required"});
   }
   if(!password){
    return res.send({status : 'Failed' , message :"PassWord is Required"});
   }
   if(!phone){
    return res.send({status : 'Failed' , message :"Phone is Required"});
   }
   if(!address){
    return res.send({status : 'Failed' , message :"Address is Required"});
   }
   if(!answer){
    return res.send({status : 'Failed' , message :"Answer is Required"});
   }
   
   // check current user is previous registered or not
   const ExistingUser = await userModel.findOne({email : email});
   if(ExistingUser){
    return res.send({status : 'Failed' , message :"Already Register , Please Login"});
   }

   // register the user
   const hashedPassword = await hashPassword(password);
   //save
    const user = await new userModel({name , email , phone , address, password: hashedPassword , answer} ).save();
    res.status(201).send({status : 'Success' , message :"User Registered Successfully"});



   } catch (error) {
    console.log(error);
    res.status(500).send({   status  : "Failed" , message  : "Error in Registration",error   : error })
   }


}


export const loginController = async(req , res)=>{
             
  try {

    const {email , password } = req.body;
    // validation 
 
    if(!email || !password){
        return res.status(404).send({   status  : "Failed" , message  : "Please Enter Email and Password" })
    }
    // check user
    const user = await userModel.findOne({email : email});
    if(!user){
        return res.status(404).send({status : "Failed"  , message : "Email not Registered"})
    }

    const match = await comparePassword(password , user.password);

    if(!match){
        return res.status(200).send({status : "Failed" , message : "Password is Incorrect"});
    }

    // Now all the validations are correct and now we  create token 
    // WE create token on based of userid of user in mongDB
    
    const token = await JWT.sign({_id:user._id} , process.env.JWT_SECRET , {
        expiresIn : "7d",
    });
    res.status(200).send({status : "Success"  , message : "Login Successfully"  , user : {
        _id : user._id,
        name : user.name,
        email : user.email,
        address : user.address,
        phone : user.phone,
        role : user.role
    } ,  token })


    
  } catch (error) {
    console.log(error);
    res.status(500).send({status :"Failed"  , message : "Error in Catch Block of LoginController " , error});
  }

}

export const forgotPasswordController = async(req ,res)=>{
  // console.log("Entered in Forget Password Controller");
 
  try {

    const {email , answer   , newPassword} = req.body;

    if(!email){
     return  res.status(400).send({status  :"Failed" , message  : "Email is required" })
    }

    if(!answer){
     return res.status(400).send({status  :"Failed" , message  : "Answer is required" })
    }
    if(!newPassword){
       return res.status(400).send({status  :"Failed" , message  : "NewPassword  is required" })
    }

    // check 
    const user = await userModel.findOne({email : email , answer : answer})

    // validation
    if(!user){
      return res.status(404).send({status : "Failed" , message : "Wrong Email or Answer"});
    }

    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id , {password : hashed});
    return res.status(200).send({
      status : "Success" , message  :"Password Changed Successfully"
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({status : "Failed"  , message :"Something went wrong" , error});
  }
}



export const testController = (req , res)=>{
    console.log("Protected ROutes");
    res.send({message: "Protected Routes"}); 
}


