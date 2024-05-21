import React , {useState} from 'react'
import Layout from '../../components/LayOut/LayOut'
import toast  from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import {useNavigate}from 'react-router-dom' // changing the url (redirecting the web page)
import '../../styles/AuthStyles.css';

const Register = () => {
    const[name , setName] = useState("");
    const[email , setEmail] = useState("");
    const[password , setPassword] = useState("");
    const[phone , setPhone] = useState("");
    const[address , setAddress] = useState("");
    const[answer , setAnswer] = useState("");
    const[confirmPassword , setConfirmPassword]  = useState("");
    const navigate = useNavigate();

    // form functino
    const handleSubmit = async (e)=>{
       e.preventDefault();
      if(password === confirmPassword){
        try {
             // axios send the data in as req.body where as it accept the res object from the backend
            const res =  await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {name , email , password , phone ,address , answer});
            if(res.data.status === "Success"){
              navigate('/login');
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
      else{
        toast.error("Password and Confirm Password does not match")
      }
    }


  return (
    <Layout title ={"Register"}>
      <div className='form-container'>

<br/>
<form onSubmit={handleSubmit}>
<h2>Registration Form </h2>
  <div className="mb-3">
    
    <input 
    placeholder='Enter Your Name'
    value={name} 
    onChange={(e)=> setName(e.target.value)} 
    type="text"
    className="form-coqntainer" 
    id="exampleInputEmail1" 
    required 
    aria-describedby="emailHelp" />

  </div>
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
 
  <div className="mb-3">
    <input 
    placeholder='Confirm Password' 
    value={confirmPassword}
    onChange={(e)=> setConfirmPassword(e.target.value)} 
    type="password" 
    className="form-contaqiner" 
    required
    id="exampleInputPassword1" />
  </div>
  
   <div className="mb-3 ">
    <input 
    placeholder='Enter Your Phone' 
    value={phone}
    onChange={(e)=> setPhone(e.target.value)} 
    type="text" 
    className="form-coqntainer" 
    required
    id="exampleInputPassword1" />
  </div>
  <div className="mb-3">
    <input 
    placeholder='Enter Your Address' 
    value={address} 
    onChange={(e)=> setAddress(e.target.value)} 
    type="text" 
    className="form-contqainer" 
    required
    id="exampleInputPassword1" />
  </div>
<div className="mb-3">

    <input 
    placeholder='What is your fav Best Batsman in Indian Team ? ' 
    value={answer} 
    onChange={(e)=> setAnswer(e.target.value)} 
    type="text" 
    className="form-coqntainer" 
    id="exampleInputEmail1" 
    required
    aria-describedby="emailHelp" />
  </div>
    
  <spam></spam>  
 
  <button 
  type="submit" 
  className="btn btn-primary">
    Register
    </button>
</form>

      </div>
    </Layout>
  )
}

export default Register;
