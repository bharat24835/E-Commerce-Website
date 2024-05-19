import React , {useState , useEffect} from 'react'
import Layout from '../../components/LayOut/LayOut'
import { IoIosWarning } from "react-icons/io";
import toast  from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import {useNavigate , useLocation}from 'react-router-dom' // changing the url (redirecting the web page)
import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/auth';

const Login = () => {

   
    const[email , setEmail] = useState("");
    const[password , setPassword] = useState("");
    const[auth , setAuth ] = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();


    // FORM FUNCTION
    const handleSubmit = async (e)=>{
        e.preventDefault();
      
         try {
              // axios send the data in as req.body where as it accept the res object from the backend
              const res =  await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email , password});
             if(res.data.status === "Success"){
                 
                 setAuth({
                  ...auth , 
                  user : res.data.user,
                  token : res.data.token,
                 })
                 // now we need to save the state into the setItems into localStorage
                 localStorage.setItem('auth' , JSON.stringify(res.data));
                 navigate( location.state || '/')
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
    <div>
         <Layout title ={"Login"}>
      <div className='form-container'>

<br/>
<form onSubmit={handleSubmit}>
<h2>Login Form </h2>
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
    placeholder='Password' 
    value={password} 
    onChange={(e)=> setPassword(e.target.value)} 
    type="password" 
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
    Login
    </button>
</form>

      </div>
    </Layout>
      
    </div>
  )
}

export default Login
