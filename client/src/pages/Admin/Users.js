import React from 'react'
import Layout from '../../components/LayOut/LayOut'
import AdminMenu from './../../components/LayOut/AdminMenu';

const Users = () => {
  return (
    <Layout title={"Users"}>
        <div className='container-fluid w-85  p-3'>
        <div className='row'>
            <div className='col-md-3'>
            <AdminMenu/>
            </div>
            
            <div className='col-md-9'>
            <h1>Users</h1>
            </div>

        </div>
        </div>
     
    </Layout>
  )
}

export default Users
