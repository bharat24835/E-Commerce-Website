import React from 'react'
import Layout from '../../components/LayOut/LayOut'
import UserMenu from '../../components/LayOut/UserMenu'

const Profile = () => {
  return (
    <div>
      <Layout title={"User Profile "}>
      <div className='container-fluid m-3  p-3'>
       <div className='row'>
        <div className='col-md-3'>  <UserMenu/> </div>
        <div className='col-md-9'> <h1> Your  Profile </h1> </div>
        
       </div>
      </div>
    </Layout>
    </div>
  )
}

export default Profile
