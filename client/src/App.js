import {Routes , Route}from 'react-router-dom'
import HomePage from './pages/Home'
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Logout from './pages/Auth/Logout';

function App() {
  return (
    <>
   <Routes>
   <Route path = '/'  element = {<HomePage/>} />
   <Route path = '/register'  element = {<Register/>} />
   <Route path = '/login'  element = {<Login/>} />
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
