import React from 'react'
import Layout from '../../components/LayOut/LayOut'
import AdminMenu from '../../components/LayOut/AdminMenu'

const CreateProduct = () => {
  return (
    <Layout title={"Create Product"}>
    <div className='container-fluid  p-3'>
    <div className='row'>
        <div className='col-md-3'>  <AdminMenu/> </div>
        
        <div className='col-md-9'> <h1>Create Product </h1>   </div>

    </div>
    </div>

 
</Layout>
  )
}

export default CreateProduct
