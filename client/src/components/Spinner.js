import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Spinner = () => {
    const[count ,setCount] = useState(5);
    const navigate = useNavigate();

   useEffect(()=>{
       const interval = setInterval(()=>{
               setCount((preValue)=> --preValue)
        }, 1000);   
        count === 0 &&  navigate('/login')  ;
        return ()=> clearInterval(interval);

   } , [count , navigate]);

  return (
    <>
    <div className="d-flex justify-content-center align-items-center " style={{height: "85vh"}}>
        <h1 className='Text-center'> Please wait , someone good is waiting for you  in {count} seconds </h1>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>



      
    </>
  )
}

export default Spinner
