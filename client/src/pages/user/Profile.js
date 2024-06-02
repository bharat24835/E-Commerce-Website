import React ,{useState , useEffect} from 'react'
import Layout from '../../components/LayOut/LayOut'
import UserMenu from '../../components/LayOut/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
  // context
   const[auth , setAuth] = useAuth();

  // state
  const[name , setName] = useState("");
  const[email , setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[phone , setPhone] = useState("");
  const[address , setAddress] = useState("");

  // get user data usign useEffect 
  useEffect(()=>{
    const {email , name , phone  , address } = auth.user;

    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);

  } ,[auth?.user])

  // forn function
  const handleSubmit = async (e)=>{
    e.preventDefault();
   
     try {
          // axios send the data in as req.body where as it accept the res object from the backend
          console.log("we are at frontend1");
         const {data} =  await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile-data`, {name , email , password , phone ,address });
         console.log("we are at frontend2");
       if(data.status === "Success"){

        setAuth({...auth, user : data?.updatedUser});
        let ls  = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updatedUser
        localStorage.setItem('auth' , JSON.stringify(ls))

        function delayFunction() {
          // Your code here
          toast.success(data.message);
          
        }
      
      setTimeout(delayFunction, 100);
       }
       else{
        function delayFunction() { 
          // Your code here
          toast.error(data.message);
          
        }
      
      setTimeout(delayFunction, 100);
       }
       } catch (error) {
       console.log(error);
       toast.error("Something went wrong");
     }
   
   
 }


  return (
    <div>
      <Layout title={"User Profile "}>
      <div className='container-fluid m-3  p-3'>
       <div className='row'>
        <div className='col-md-3'>  <UserMenu/> </div>
        <div className='col-md-9'> 
        <div className='form-container'>
        <form onSubmit={handleSubmit}>
<h2>User Profile </h2>
  <div className="mb-3">
    
    <input 
    placeholder='Enter Your Name'
    value={name} 
    onChange={(e)=> setName(e.target.value)} 
    type="text"
    className="form-cntainer" 
    id="exampleInputEmail1" 
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
    aria-describedby="emailHelp" 
    disabled
    />
  </div>
  <div className="mb-3">
    <input 
    placeholder='Password' 
    value={password} 
    onChange={(e)=> setPassword(e.target.value)} 
    type="password" 
    className="form-contaiqner" 
    id="exampleInputEmail1" 
    />
  </div>
 

  
   <div className="mb-3 ">
    <input 
    placeholder='Enter Your Phone' 
    value={phone}
    onChange={(e)=> setPhone(e.target.value)} 
    type="text" 
    className="form-coqntainer" 
    id="exampleInputPassword1" />
  </div>
  <div className="mb-3">
    <input 
    placeholder='Enter Your Address' 
    value={address} 
    onChange={(e)=> setAddress(e.target.value)} 
    type="text" 
    className="form-contqainer"   
    id="exampleInputPassword1" />
  </div>

    
  <spam></spam>  
 
  <button 
  type="submit" 
  className="btn btn-primary">
    Update
    </button>
</form></div> </div>
        
       </div>
      </div>
    </Layout>
    </div>
  )
}

export default Profile
