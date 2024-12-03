import React , {useState , useEffect} from 'react'
import Layout from '../../components/LayOut/LayOut'
import { IoIosWarning } from "react-icons/io";
import toast  from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import {useNavigate , useLocation}from 'react-router-dom' // changing the url (redirecting the web page)
import '../../styles/AuthStyles.css';

const Reset2 = (props) => {
    const[otp , setOtp] = useState("");
    const[passwordMatches , setPasswordMatches] = useState(false);

    const navigate = useNavigate();

 // FORM FUNCTION
 const handleSubmit =  (e)=>{
    e.preventDefault();
  
     try {
          // axios send the data in as req.body where as it accept the res object from the backend
        console.log("Props otp is : " , props.otp);
         if(otp == props.otp){
             
             
             
             function delayFunction() {
               // Your code here
               toast.success("OTP Matches");
             }
           
           setTimeout(delayFunction, 100);
           
             // now the page login to login page 
             
         }
         else{
             toast.error("Otp does not Matches ");
         }


     } catch (error) {
       console.log(error);
       toast.error("Something went wrong");
     }
   
 }



 if(!passwordMatches){
  return (
    <div>
    <Layout title ={"Enter OTP"}>
 <div className='form-container'>

<br/>
<form onSubmit={handleSubmit}>
<h2> Enter The OTP </h2>
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
<div className="mb-3">

<input 
placeholder='Enter the OTP' 
value={otp} 
onChange={(e)=> setOtp(e.target.value)} 
type="text" 
className="form-coqntainer" 
id="exampleInputEmail1" 
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

<button 
type="submit" 
className="btn btn-primary">
Validise OTP
</button>
</form>

 </div>
</Layout>
 
</div>
  )
 }
 else{
  return (
    <div>
    <Layout title ={"Enter New Password"}>
 <div className='form-container'>

<br/>
<form onSubmit={handleSubmit}>
<h2> Enter The OTP </h2>
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
<div className="mb-3">

<input 
placeholder='Enter New Password' 
value={otp} 
onChange={(e)=> setOtp(e.target.value)} 
type="text" 
className="form-coqntainer" 
id="exampleInputEmail1" 
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

<button 
type="submit" 
className="btn btn-primary">
Validise OTP
</button>
</form>

 </div>
</Layout>
 
</div>
  )
 }
}

export default Reset2
