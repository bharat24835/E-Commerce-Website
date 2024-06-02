import React from 'react'
import Layout from '../components/LayOut/LayOut'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const CartPage = () => {
  const[cart , setCart] = useCart();
  const[auth , setAuth] = useAuth();
  const navigate = useNavigate();


  // total price
  const totalPrice = ()=>{
    try {
      let total =  0 ;
      cart?.map((item) => 
        {total  = total + item.price});
      return total.toLocaleString("en-us" , {
        style : "currency" , 
        currency : 'USD',
      });
    } catch (error) {
      console.log(error);
    }
  }



  // delete item
  const removeCartItem = (pid)=>{
    try {
      
      let myCart = [...cart ];
      let index = myCart.findIndex(item => item._id === pid);

      myCart.splice(index , 1);
      localStorage.setItem('cart' , JSON.stringify(myCart));
      setCart(myCart);

    } catch (error) {
      console.log(error);
      toast.error(`Error in removing Item`)
    }
  }

  return (
    <Layout>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h1 className='text-center bg-light p-2 mb-1'> {`Hello ${auth?.token && auth?.user?.name}`}</h1>

            <h4 className='text-center'>
              {cart?.length > 0 ? `You have ${cart.length} items in your cart      ${auth?.token ? "" : "PLease login to CheckOut"} ` : "Your Cart is Empty" }
            </h4>
          </div> 
        </div>

        <div className='row'>
          <div className='col-md-8'>
            {
              cart?.map(p =>(
                <div className='row flex-row p-3 mb-2 card'>
                    <div className='col-md-4'>
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} width={'70px'} height={'250px'}/>
                    </div>
                    <div className='col-md-4'>
                       <h4>{p.name}</h4>
                       <p>{p.description}</p>
                       <p>Price is  - ${p.price}</p>
                       <button className='btn btn-danger' onClick={()=>removeCartItem(p._id)}>Remove</button>
                      </div>            
                </div>
              ))
            }
          </div>
          <div className='col-md-4 text-center'> 
          <h4>Cart Summary</h4>
          <p> Total | Checkout | Payment </p>
          <hr/>
          <h4>Total : {totalPrice()}</h4>

          {auth?.user?.address ? (
            <>
            <div className='mb-3'>
              <h4>Current Address</h4>
              <h5>{auth?.user?.address}</h5>
              <button className='btn btn-outline-warning' onClick={()=> navigate('/dashboard/user/profile')}> 
                Update Address
                </button>
            </div>
            </>
          ) : (
            <div className='mb-3'>
              {
                auth?.token ? (
                  <button className='btn btn-outline-warning'
                   onClick={()=> navigate('/dashboard/user/profile') }>UpdateAddress </button>
                ):(
               <button className='btn btn-outline-warning'
               onClick={()=> navigate('/login' ,{ state : '/cart' }) }>Please Login to Checkout</button>
                )
              }
            </div>
          )}

          </div>
        </div>
      </div>

    </Layout>
  )
}

export default CartPage
