import React from "react";
import { NavLink  ,Link} from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../../context/auth";
import Register from './../../pages/Auth/Register';
import SearchInput from "../Form/SearchInput";
// import Dashboard from './../../pages/user/Dashboard';
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import  {Badge} from 'antd'

const Header = ()=>{
    const [auth , setAuth] = useAuth();
    const [cart , setCart] = useCart(); 
    const categories = useCategory();

    const handleLogout = ()=>{
      setAuth({
        ...auth,
        user:null,
        token :" "
      })
      localStorage.removeItem('auth');
    }

    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
      <Link to = "/" className="navbar-brand" > <FaShoppingCart />  ECommerce App</Link>
   
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item">
          <NavLink to = "/" className="nav-link"  >Home</NavLink>
        </li>
        <li className="nav-item dropdown">
  <Link className="nav-link dropdown-toggle" to ={"/categories"} href="#"  data-bs-toggle="dropdown" >
    Categories
  </Link>
  <ul className="dropdown-menu">
    <li>
    <Link className="dropdown-item" to= {`/categories`} href="#">All Categories</Link>
    </li>
  {categories?.map((c)=> (
    
    <li><Link className="dropdown-item" to= {`/category/${c.slug}`} href="#">{c.name}</Link></li>
   
  
  ))}
  </ul>

  
</li>


        
        {
          !auth.user ?    
          (<>

        <li className="nav-item">
          <NavLink to = "/register" className="nav-link" >Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to = "/login" className="nav-link" >Login</NavLink>
        </li>  
        </>)
        :
        (<>

<li className="nav-item dropdown">
  <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
  <li className="dropdown-item">
          <NavLink to = {`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}  className="nav-link" >Dashboard </NavLink>
    </li>
    <li className="dropdown-item">
          <NavLink to = "/logout"  className="nav-link" >Logout </NavLink>
    </li>


    {/* <li>
      <hr className="dropdown-divider" />
    </li>
    <li><NavLink className="dropdown-item" href="#">Something else here</NavLink></li> */}
  </ul>
</li>

        
        </>)
        }
        <li className="nav-item">
        <Badge count={cart?.length} showZero>
        <NavLink to = "/cart" className="nav-link" >Cart </NavLink>
        </Badge>
          
        </li>
        
      </ul>
     
    </div>
  </div>
</nav>

        </>
    )
}
export default Header;