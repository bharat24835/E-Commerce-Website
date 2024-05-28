import React , {useEffect , useState} from 'react'
import Layout from '../../components/LayOut/LayOut'
import AdminMenu from '../../components/LayOut/AdminMenu'
import toast  from 'react-hot-toast';
import axios from 'axios';
import { FaUniregistry } from 'react-icons/fa';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal }from 'antd'

const CreateCategory = () => {
  const [categories , setCategories] = useState([]);
  const[name  , setName] =useState("");
  const[visible , setVisible] = useState(false)
  const[selected , setSelected] = useState(null);
  const[updatedName ,setUpdatedName] = useState("");

  // handle form function
  const handleSubmit =async(e)=>{
    e.preventDefault();
    try {

      const{data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category` , {name});
      if(data.status === "Success"){
        toast.success(`"${name}" Category is created`);
        setName("");
        getAllCategory();
      }
      else{
        toast.error(`${data.message}`)
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Input Form");
    }
  }

  // get all category
  const getAllCategory = async ()=>{
    try {

      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`) ;
      if(data?.status === "Success"){
        setCategories(data.category);
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting Category");
    }
  }

  useEffect(()=>{
     getAllCategory();
  } , [])

  // update category
  const handleUpdateCategory = async(e)=>{
    e.preventDefault();
    try {
      const{data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}` ,
       {name : updatedName})

       if(data.status === "Success"){
        toast.success(`"${updatedName}" Category is Updated` );
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
       }
       else{
        toast.error(data.message);
       }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Updating the Category")
    }
  }

   // delete category
   const handleDeleteSubmit = async(category)=>{
   
    try {
      const{data} = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${category._id}` );

       if(data.status === "Success"){
        toast.success(`"${category.name}" Category is Deleted` );

      
      
        getAllCategory();
       }
       else{
        toast.error(data.message);
       }
      
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in Updating the Category")
    }
  }
    return (
    
    <Layout title={"Create Category"}>
    <div className='container-fluid w-85  p-3'>
    <div className='row'>
        <div className='col-md-3'> <AdminMenu/> </div>
        <div className='col-md-9'>
          <h1>Manage Category  </h1> 
          <div className='p-3 w-50'>
            <CategoryForm handleSubmit={handleSubmit} value = {name} setValue = {setName}/>
          </div>
          <div className='w-75'>
         <table className="table">
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    
    
      {categories.map((c) =>(
        <tr>
          <>
        <td key = {c._id}> {c.name} </td>
        <td>
          <button className='btn btn-primary ms-2'  onClick={()=> {setVisible(true) ; setUpdatedName(c.name) ; setSelected(c)} }> Edit</button>
          <button className='btn btn-danger  ms-4'  onClick={()=> {handleDeleteSubmit(c)}}> Delete</button>
        </td>
        
        </>
        </tr>

      ))}
    
  </tbody>
</table>

          </div>
          <Modal 
          onCancel={()=> setVisible(false)} footer = {null} visible = {visible}>

          <CategoryForm value = {updatedName} setValue={setUpdatedName} handleSubmit={handleUpdateCategory}/>
          </Modal>
           </div>

    </div>
     </div>
    </Layout>
  )
}

export default CreateCategory
