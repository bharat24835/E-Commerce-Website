import React from 'react'
import Layout from '../../components/LayOut/LayOut';
import UserMenu from '../../components/LayOut/UserMenu';
import { useAuth } from '../../context/auth';


const Dashboard = () => {
  const[auth] = useAuth();
  return (
    <div>
      < Layout title = {' User  : Dashboard '}>
   
      <div className='container-fluid m-3  p-3'>
       <div className='row'>
        <div className='col-md-3'>  <UserMenu/> </div>
        
         <div className='col-md-9'>
            <div className='card w-75 p-3'>
            <h3> {auth?.user?.name}</h3>
            <h3> {auth?.user?.email}</h3>
            <h3> {auth?.user?.address}</h3>

            </div>
         </div>
         
        
       </div>
      </div>

      </Layout>
    </div>
  )
}

export default Dashboard
