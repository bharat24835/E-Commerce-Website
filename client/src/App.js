import {Routes , Route}from 'react-router-dom'
import HomePage from './pages/Home'
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';

// import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Logout from './pages/Auth/Logout';
import Dashboard from './pages/user/UserDashboard.js';
import PrivateRoute from './components/Routes/Private.js';
import Forgot_password from './pages/Auth/Forgot_password.js';
import AdminRoute from './components/Routes/AdminRoute.js'
import AdminDashBoard from './pages/Admin/AdminDashBoard.js';
import CreateCategory from './pages/Admin/CreateCategory.js';
import CreateProduct from './pages/Admin/CreateProduct.js';
import Users from './pages/Admin/Users.js';
import Orders from './pages/user/Orders.js';
import Profile from './pages/user/Profile.js';
import Products from './pages/Admin/Products.js';
import UpdateProduct from './pages/Admin/UpdateProduct.js';
import Search from './pages/Search.js';
import ProductDetails from './pages/ProductDetails.js';
import Categories from './pages/Categories.js';
import CategoryProduct from './pages/CategoryProduct.js';
import CartPage from './pages/CartPage.js';

function App() {
  return (
    <>
   <Routes>
   {/* <Route path = '/'  element = {<HomePage/>} /> */}
   <Route path = '/product/:slug'  element = {<ProductDetails/>} />
   <Route path = '/categories'  element = {<Categories/>} />
   <Route path = '/cart'  element = {<CartPage/>} />
   <Route path = '/category/:slug'  element = {<CategoryProduct/>} />
   <Route path = '/search' element = {<Search/>} />
   
   {/* nesting se  routes protected rehte hai */}
   <Route path = "/dashboard" element ={<PrivateRoute/>}>

         <Route path = "user"  element = {<Dashboard/>} />
         <Route path = "user/orders"  element = {<Orders/>} />
         <Route path = "user/profile"  element = {<Profile/>} />

   </Route>
   <Route path = '/dashboard'  element = {<AdminRoute/>} >
          <Route path = "admin" element = {<AdminDashBoard/>} />
          <Route path = "admin/create-category" element = {<CreateCategory/>} />
          <Route path = "admin/create-product" element = {<CreateProduct/>} />
          <Route path = "admin/product/:slug" element = {<UpdateProduct/>} />
          <Route path = "admin/products" element = {<Products/>} />
          <Route path = "admin/users" element = {<Users/>} />

   </Route>
   <Route path = '/register'  element = {<Register/>} />
   <Route path = '/forget-password'  element = {<Forgot_password/>} />
   <Route path = '/'  element = {<Login/>} />
   <Route path = '/logout'  element = {<Logout/>} />
   <Route path = '/about'  element = {<About/>} />
   <Route path = '/contact'  element = {<Contact/>} />
   <Route path = '/policy'  element = {<Policy/>} />
   <Route path = '*'  element = {<Pagenotfound/>} />
     

   </Routes>
    </>
  );
}

export default App;
