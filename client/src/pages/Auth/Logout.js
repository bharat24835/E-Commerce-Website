import React from 'react'
import Layout from '../../components/LayOut/LayOut'
import {useNavigate  } from "react-router-dom";
import { IoIosWarning } from "react-icons/io";
import toast  from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'

import '../../styles/AuthStyles.css';
import { useAuth } from '../../context/auth';

const Logout = () => {
    const [auth , setAuth] = useAuth();
    const navigate = useNavigate();

    const handleSubmit = ()=>{
      setAuth({
        ...auth,
        user:null,
        token :" "
      })
      localStorage.removeItem('auth');
       function temp(){
        toast.success("Logout Successfully");
       }
       setTimeout(temp , 100);
    
      
        // Your code here
        navigate('/login');
      
    
    
     
    }

  return (
    <div>
         <Layout title ={"LogOut"}>
      <div className='form-container'>

<br/>
<form onSubmit={handleSubmit}>
<h2>Are you Sure want to logut </h2>
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
  {/* <div className="mb-3">

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
    Are You Sure want to Logout ??
    </button>
</form>

      </div>
    </Layout>
      
    </div>
  )
}

export default Logout
