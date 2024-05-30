import axios from 'axios'
import Layout from '../components/LayOut/LayOut'
import React, { useEffect, useState } from 'react'
import { useParams  } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams();
    const[product , setProduct] = useState({});
     

    // initial p detaiks
    useEffect(()=>{
        if(params?.slug) getProduct();
    } , [params.slug])

    // get product
    const getProduct = async()=>{
        try {
            const{data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`)
            setProduct(data?.product)
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <Layout>
       
       <div className='row container mt-2'>

        <div className='col-md-6'>  
        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name}/>
        </div>

        <div className='col-md-6 '>
            <h1 className='text-center'>Product Details</h1>
            <h6>Name : {product.name}</h6>
            <h6>Description : {product.description}</h6>
            <h6>Price : {product.price}</h6>
            {/* <h6>Category : {product.category}</h6> */}
            
            


        </div>
        
       </div>
       <div className='row'>Similar Products </div>
    </Layout>
  )
}   

export default ProductDetails
