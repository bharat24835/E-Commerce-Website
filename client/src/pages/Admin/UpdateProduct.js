import React , {useState , useEffect} from 'react'
import Layout from '../../components/LayOut/LayOut'
import AdminMenu from '../../components/LayOut/AdminMenu'
import toast  from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd';
import {useNavigate , useParams} from 'react-router-dom';
const {Option} = Select;
const UpdateProduct = () => {


    const navigate = useNavigate();
    const params = useParams();
    const[categories , setCategories] = useState([]);
    const[category , setCategory] = useState("");
    const[name ,setName] = useState("");
    const[description ,setDescription] = useState("");
    const[price ,setPrice] = useState("");
    const[quantity ,setQuantity] = useState("");
    const[shipping ,setShipping] = useState("");
    const[photo ,setPhoto] = useState("");
    const[id ,setId] = useState("");
  

    // get single product
    const getSingleProduct = async()=>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-single-product/${params.slug}`)
            
            setId(data.product._id);
            setName(data.product.name)
            setDescription(data.product.description)
            setPrice(data.product.price)
            setQuantity(data.product.quantity)
            setShipping(data.product.shipping)
            setCategory(data.product.category._id)
            


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getSingleProduct();
        //eslint-disable-next-line
    },[])
  
  
    // get all category
    const getAllCategory = async ()=>{
      try {
  
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`) ;
        if(data?.status === "Success"){
          setCategories(data?.category);
        }
        
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong in getting Category");
      }
    }
  
    useEffect(()=>{
      getAllCategory();
   } , [])
  
   // create product function
   const handleUpdateProduct = async(e)=>{
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name" , name)
      productData.append("description" , description)
      productData.append("price" , price)
      productData.append("quantity" , quantity)
      photo && productData.append("photo" , photo)
      productData.append("category" , category)
      productData.append("shipping" , shipping)
  
      // const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product` , 
      // {name , description , price , quantity , photo , category})
  
      const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}` , productData)
      if(data?.status === "Success"){
        navigate('/dashboard/admin/products')
        function delayFunction() {
          // Your code here
          toast.success(`"${name}" Product Update Successfully `);
        }
      
      setTimeout(delayFunction, 100);
      }
      else{
        toast.error(data?.message);
      }
  
  
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while Updating the Product")
    }
  
   }


   // delete a product
   const handleDeleteProduct = async()=>{
    try {
        let answer  = window.prompt("Are you sure want to delete this Product");
        if(!answer) return;
       

        const {data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}` )
        navigate('/dashboard/admin/products');
        function delayFunction() {
            // Your code here
            toast.success(`"${name}" Product Deleted Successfully `);
          }
        
        setTimeout(delayFunction, 100);
        }
        
    catch (error) {
        console.log(error);
        toast.error("Error while Deleting Product at Frontend");
    }
   }
  return (
    <Layout title={"Update Product"}>
    <div className='container-fluid  p-3'>
    <div className='row'>
        <div className='col-md-3'> 
         <AdminMenu/>
        </div>
        
        <div className='col-md-9'>
           <h1>Update Product </h1>  

          <div className='m-1 w-75'>
            <Select 
            bordered = {false} 
            placeholder = "Select a Category"  
            size = "large" 
            showSearch
            className='form-select mb-3' onChange={(value)=>{setCategory(value)} } value={category}>
              {categories?.map(c=>(
                <Option key = {c._id} value = {c._id}>
                  {c.name}
                  </Option>
              ))}

            </Select>
            <div className='mb-3'>
              <label className='btn btn-outline-secondary col-md-12'>
                {photo ? photo.name : "Upload Photo"}
                <input type = "file" name ='photo' accept='images/*' onChange={(e)=>setPhoto(e.target.files[0])} hidden/>
              </label>

            </div>
            <div className='mb-3'>
              {photo ? (
                <div className='text-center'>
                  <img src ={URL.createObjectURL(photo)} alt = "Product Photo" height = {'200px'} className='img img-responsive' />
                </div>
              ) : (
                <div className='text-center'>
                  <img src ={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`} alt = "Product Photo" height = {'200px'} className='img img-responsive' />
                </div>
              )
              } 

            </div>
            <div className='mb-3'>
              <input type = 'text' value = {name} placeholder='Product Name' className='form-control'
               onChange={(e)=> setName(e.target.value)} />
            </div>

            <div className='mb-3'>
              <input type = 'text' value = {description} placeholder='Product Description' className='form-control'
               onChange={(e)=> setDescription(e.target.value)} />
            </div>

            <div className='mb-3'>
              <input type = 'number' value = {price} placeholder='Product Price (Indian Currency)' className='form-control'
               onChange={(e)=> setPrice(e.target.value)} />
            </div>
            <div className='mb-3'>
              <input type = 'number' value = {quantity} placeholder='Product Quantity' className='form-control'
               onChange={(e)=> setQuantity(e.target.value)} />
            </div>

            <Select
            bordered =  {false}
            placeholder = "Select Shipping"
            size = "large"
            showSearch
            className='from select mb-3'
            onChange={(value)=>{
              setShipping(value);
            }}
            value = {shipping ? "Yes" : "No"}
            >
             <Option value = "0">No</Option>
             <Option value = "1">Yes</Option>
             

            </Select>
          </div> 
          <div className='mb-3'>
            <button className='btn btn-primary' onClick={handleUpdateProduct}>Update Product</button>
            <button className='btn btn-danger' onClick={handleDeleteProduct}>Delete Product</button>
          </div>  
         </div>

    </div>
    </div>

 
</Layout>
  )
}

export default UpdateProduct
