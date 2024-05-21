import React ,{useState} from 'react'
import Layout from '../../components/LayOut/LayOut'
import toast  from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import {useNavigate , useLocation}from 'react-router-dom' // changing the url (redirecting the web page)
import '../../styles/AuthStyles.css';



const Forgot_password = () => {
     
    const[email , setEmail] = useState("");
    const[newPassword , setnewPassword] = useState("");
    const[answer, setAnswer] = useState("");
    
    
    const navigate = useNavigate();
    // const location = useLocation();


    // FORM FUNCTION
    const handleSubmit = async (e)=>{
        e.preventDefault();
      
         try {
              // axios send the data in as req.body where as it accept the res object from the backend
              console.log("Before Axios");
              // const res =  await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email , password});

              const res =  await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email , answer , newPassword});
              console.log("After Axios");
             if(res.data.status === "Success"){
                 
                
                
                 navigate( '/login')
                 function delayFunction() {
                   // Your code here
                   toast.success(res.data.message);
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

  return (
   
   <Layout title={"Reset Password"}>
   <div className='form-container'>

<br/>
<form onSubmit={handleSubmit}>
<h2>Reset Password </h2>
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
    placeholder='Enter Your Gmail' 
    value={email} 
    onChange={(e)=> setEmail(e.target.value)} 
    type="email" 
    className="form-coqntainer" 
    id="exampleInputEmail1" 
    required
    aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <input 
    placeholder='Enter New Password' 
    value={newPassword} 
    onChange={(e)=> setnewPassword(e.target.value)} 
    type="password" 
    className="form-contaiqner" 
    id="exampleInputEmail1" 
    required
    aria-describedby="emailHelp" />
  </div>
  <div className="mb-3">
    <input 
    placeholder='What is your fav Best Batsman in Indian Team ?' 
    value={answer} 
    onChange={(e)=> setAnswer(e.target.value)} 
    type="text" 
    className="form-contaiqner" 
    id="exampleInputEmail1" 
    required
    aria-describedby="emailHelp" />
  </div>
 
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
    Reset
    </button>
</form>

      </div>
   </Layout>
   
  )
}

export default Forgot_password
