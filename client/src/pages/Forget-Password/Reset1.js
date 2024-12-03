import React , {useState , useEffect} from 'react'
import Layout from '../../components/LayOut/LayOut'
import { IoIosWarning } from "react-icons/io";
import toast  from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import {useNavigate , useLocation}from 'react-router-dom' // changing the url (redirecting the web page)
import '../../styles/AuthStyles.css';



const Reset1 = () => {
    const[email , setEmail] = useState("");
    const[isSend , setIsSend] = useState(false);
    const[OTP , setOTP]  = useState("");
    const[enterOTP , setEnterOTP] = useState("");
    const[passwordMatches , setPasswordMatches] = useState(false);
    const[password , setPassword]  =useState("");
    const[confirmPassword , setConfirmPassword]  = useState("");

    const navigate = useNavigate();
    const location = useLocation();


    // FORM FUNCTION
    const handleSubmit1 = async (e)=>{
        e.preventDefault();
      
         try {
              // axios send the data in as req.body where as it accept the res object from the backend
              const res =  await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email });
             if(res.data.status === "Success"){
                 
                 console.log(` OTP is Send `);
                 setIsSend(true);
                 setOTP(res.data.otp);
                 function delayFunction() {
                   // Your code here
                   toast.success( `OTP is :  ${res.data.otp}`);
                 }
               
               setTimeout(delayFunction, 100);
               
                 // now the page login to login page 
                 
             }
             else{
                 toast.error(res.data.message);
             }
 
 
         } catch (error) {
           console.log(error);
           toast.error("Something went wrong");
         }
       
     }

     // FORM FUNCTION 2
    const handleSubmit2 = async (e)=>{
      e.preventDefault();
    
       try {
              if(enterOTP === OTP)
         {

              setPasswordMatches(true)
               function delayFunction() {
                 // Your code here
                 toast.success( "OTP Matches ");
               }
             
             setTimeout(delayFunction, 100);
          }
          else{
            toast.error( "OTP Does not Matches");
          }
             
               // now the page login to login page 
        


       } catch (error) {
         console.log(error);
         toast.error("Something went wrong");
       }
     
   }

   const handleSubmit3 = async(e)=>{
    e.preventDefault();

    try {

      if(password === confirmPassword){
// axios send the data in as req.body where as it accept the res object from the backend
const res =  await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/reset-password`, { email , newPassword: password });
        if(res.data.status === "Success" ){
          navigate( location.state || '/login')
          function delayFunction() {
            // Your code here
            toast.success(res.data.message);
          }
        
        setTimeout(delayFunction, 100);

        }
        else{
            toast.error(res.data.message);
        }

      }
      else{
        toast.error( "Password and Confirm Password not matches");
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
   }


 if(!passwordMatches){
  return (
    <div>
         <Layout title ={"Password Reset"}>
      <div className='form-container'>

<br/>
<form onSubmit={isSend ? handleSubmit2 : handleSubmit1} >
<h2> Enter Your Details </h2>
  {/* <div className="mb-3">
    
    <input 
    placeholder='Enter Your Name'
    value={name} 
    onChange={(e)=> setName(e.target.value)} 
    type="text"
    className="form-coqntainer" 
    id="exampleInputEmail1" 
    required 
    aria-describedby="emailHelp" />

  </div> */}
  {
    isSend ? 
    <div className="mb-3">

    <input 
    placeholder='Enter OTP' 
    value={enterOTP} 
    onChange={(e)=> setEnterOTP(e.target.value)} 
    type="text" 
    className="form-coqntainer" 
    id="exampleInputText" 
    required
    aria-describedby="emailHelp" />
  </div> 
  :
  <div className="mb-3">

    <input 
    placeholder='Enter Your Gmail' 
    value={email} 
    onChange={(e)=> setEmail(e.target.value)} 
    type="email" 
    className="form-coqntainer" 
    id="exampleInputText" 
    required
    aria-describedby="emailHelp" />
  </div>
  }
  {/* <div className="mb-3">
    <input 
    placeholder='Enter your Name' 
    value={name} 
    onChange={(e)=> setName(e.target.value)} 
    type="text" 
    className="form-contaiqner" 
    id="exampleInputEmail1" 
    required
    aria-describedby="emailHelp" />
  </div> */}
 
  {/* <div className="mb-3">
    <input 
    placeholder='Confirm Password' 
    value={confirmPassword}
    onChange={(e)=> setConfirmPassword(e.target.value)} 
    type="password" 
    className="form-contaqiner" 
    required
    id="exampleInputPassword1" />
  </div> */}
  
   {/* <div className="mb-3 ">
    <input 
    placeholder='Enter Your Phone' 
    value={phone}
    onChange={(e)=> setPhone(e.target.value)} 
    type="text" 
    className="form-coqntainer" 
    required
    id="exampleInputPassword1" />
  </div> */}
  {/* <div className="mb-3">
    <input 
    placeholder='Enter Your Address' 
    value={address} 
    onChange={(e)=> setAddress(e.target.value)} 
    type="text" 
    className="form-contqainer" 
    required
    id="exampleInputPassword1" />
  </div> */}

    
  <spam></spam>  
 
  {isSend ?
  <button  type="submit" className="btn btn-primary">   Validise OTP   </button>   
  :
  <button  type="submit" className="btn btn-primary">  SEND OTP  </button>
}
</form>

      </div>
    </Layout>
      
    </div>
  )
 }
 else{
  return (
    <div>
         <Layout title ={"Password Reset"}>
      <div className='form-container'>

<br/>
<form onSubmit={handleSubmit3} >
<h2> Enter Your New password </h2>
 
  
    <div className="mb-3">

    <input 
    placeholder='Enter New Password' 
    value={password} 
    onChange={(e)=> setPassword(e.target.value)} 
    type="password" 
    className="form-coqntainer" 
    id="exampleInputText" 
    required
    aria-describedby="emailHelp" />
  </div> 
  
  <div className="mb-3">

    <input 
    placeholder='Enter Confirm New Password' 
    value={confirmPassword} 
    onChange={(e)=> setConfirmPassword(e.target.value)} 
    type="password" 
    className="form-coqntainer" 
    id="exampleInputPassword" 
    required
    aria-describedby="emailHelp" />
  </div>
  
  {/* <div className="mb-3">
    <input 
    placeholder='Enter your Name' 
    value={name} 
    onChange={(e)=> setName(e.target.value)} 
    type="text" 
    className="form-contaiqner" 
    id="exampleInputEmail1" 
    required
    aria-describedby="emailHelp" />
  </div> */}
 
  {/* <div className="mb-3">
    <input 
    placeholder='Confirm Password' 
    value={confirmPassword}
    onChange={(e)=> setConfirmPassword(e.target.value)} 
    type="password" 
    className="form-contaqiner" 
    required
    id="exampleInputPassword1" />
  </div> */}
  
   {/* <div className="mb-3 ">
    <input 
    placeholder='Enter Your Phone' 
    value={phone}
    onChange={(e)=> setPhone(e.target.value)} 
    type="text" 
    className="form-coqntainer" 
    required
    id="exampleInputPassword1" />
  </div> */}
  {/* <div className="mb-3">
    <input 
    placeholder='Enter Your Address' 
    value={address} 
    onChange={(e)=> setAddress(e.target.value)} 
    type="text" 
    className="form-contqainer" 
    required
    id="exampleInputPassword1" />
  </div> */}

    
  <spam></spam>  
 
  
  <button  type="submit" className="btn btn-primary">   Change Password   </button> 

</form>

      </div>
    </Layout>
      
    </div>
  )
 }
}



export default Reset1
